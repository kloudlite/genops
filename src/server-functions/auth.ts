"use server";
import { UserRepo } from "@/orm";
import { createHash } from "crypto";


type Response<T> = {
  data?: T;
  error?: string;
};

export const login = async ({username, password}:{username: string, password: string}) => {
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

  return { data: true };
};

export const signup = async (
  { name, email, username, password }: {
    name: string;
    email: string;
    username: string;
    password: string;
  },
): Promise<Response<boolean>> => {
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
