"use server";
import { UserRepo } from "@/orm";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

type Response<T> = {
  data?: T;
  error?: string;
};

type SessionPayload = {
  username: string;
  expiresAt: Date;
};

const encodedKey = new TextEncoder().encode(process.env.SESSION_ENCODER_KEY);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return error;
  }
}

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await UserRepo.findOne({ where: { username } });

  if (!user) {
    return { error: "UserNotFound" };
  }

  const hash = createHash("md5");
  hash.update(password);
  const hashedPassword = hash.digest("hex");

  if (user.password !== hashedPassword) {
    return { error: "InvalidPassword" };
  }

  const cookieStore = await cookies();
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);
  const session = await encrypt({ username: user.username, expiresAt });

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  redirect("/app");
  return { data: true };
};

export const signup = async ({
  name,
  email,
  username,
  password,
}: {
  name: string;
  email: string;
  username: string;
  password: string;
}): Promise<Response<boolean>> => {
  if (!name) {
    return { error: "NoName" };
  }
  if (!email) {
    return { error: "NoEmail" };
  }
  if (!username) {
    return { error: "NoUsername" };
  }
  if (!password) {
    return { error: "NoPassword" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "InvalidEmail" };
  }
  if (password.length < 8) {
    return { error: "PasswordTooShort" };
  }
  const existingUser = await UserRepo.findOne({
    where: [{ email }, { username }],
  });
  if (existingUser) {
    return { error: "UserAlreadyRegistered" };
  }

  const hash = createHash("md5");
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  password = hashedPassword;

  const user = UserRepo.create({
    name,
    email,
    username,
    password,
  });
  await UserRepo.save(user);
  return { data: true };
};

export const checkAuth = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/auth/signin")
    return { error: "NoSession" };
  }

  const payload = await decrypt(session.value);

  if (payload instanceof Error) {
    redirect("/auth/signin")
    return { error: "InvalidSession" };
  }

  const { username, expiresAt } = payload as SessionPayload;

  if (new Date(expiresAt) < new Date()) {
    redirect("/auth/signin")
    return { error: "SessionExpired" };
  }
  
  return { data: { username } };
};
