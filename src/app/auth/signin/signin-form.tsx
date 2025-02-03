"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/server-functions/auth";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const SingInForm = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    const result = await login(data);
    if (result.error) {
      const errorMapping: Record<string, Partial<typeof error>> = {
        UserNotFound: { username: "Incorrect email or password" },
        InvalidPassword: { password: "Incorrect password! try again." },
        default: { general: "Something went wrong, please try again." },
      };
      setError(errorMapping[result.error] || errorMapping.default);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error.general && (
        <div className="text-red-500 text-sm">{error.general}</div>
      )}
      <CardContent className="grid gap-4">
        <div>
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
        <Button type="submit" className="mt-3 w-full">
          Sign in
        </Button>
        <div className="text-sm text-center mt-3">
          Don&apos;t have account?{" "}
          <Link href="/auth/signup" className="text-blue-500">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};
