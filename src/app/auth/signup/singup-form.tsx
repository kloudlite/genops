"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/server-functions/auth";
import { Eye, EyeOff } from "lucide-react"; // For toggle icons
import Link from "next/link";
import { useState } from "react";

type FormErrors = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  general?: string;
};

const errorMapping: Record<string, Partial<FormErrors>> = {
  NoName: { name: "Name is required" },
  NoEmail: { email: "Email is required" },
  NoUsername: { username: "Username is required" },
  NoPassword: { password: "Password is required" },
  InvalidEmail: { email: "Invalid email format" },
  PasswordTooShort: {
    password: "Password must be at least 8 characters",
  },
  UserAlreadyRegistered: {
    email: "Email or Username already registered",
    username: "Email or Username already registered",
  },
  ServerError: {
    general: "An unexpected error occurred. Please try again later.",
  },
  default: { general: "Something went wrong, please try again." },
};

export const SignupForm = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false); // Toggle State

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    const result = await signup(data);
    console.log(result.error);
    if (result.error) {
      setError(errorMapping[result.error] || errorMapping.default);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error.general && (
        <div className="text-red-500 text-sm">{error.general}</div>
      )}
      <CardContent className="grid gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="Enter your email address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Choose a username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          {error.username && (
            <p className="text-red-500 text-xs">{error.username}</p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error.password && (
            <p className="text-red-500 text-xs">{error.password}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="text-sm text-center mt-3">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-blue-500">
              Terms of Service
            </a>
            .
          </div>
          <Button type="submit" className="mt-3">
            Sign up
          </Button>
        </div>
        <div className="text-sm text-center mt-3">
          Already registered?{" "}
          <Link href="/auth/signin" className="text-blue-500">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};
