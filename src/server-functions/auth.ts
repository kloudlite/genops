"use server";
import { UserRepo } from "@/orm";


type Response<T> = {
  data?: T;
  error?: string;
};

export const login = async (username: string, password: string) => {
  return {
    username,
    password,
  };
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
  const user = UserRepo.create({
    name,
    email,
    username,
    password,
  });
  await UserRepo.save(user);
  return { data: true };
};
