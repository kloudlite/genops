"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/server-functions/auth";
import { Eye, EyeOff } from "lucide-react"; // For toggle icons
import { useState } from "react";

export const SignupForm = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<{
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false); // Toggle State

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    const result = await signup(data);
    console.log(result.error);
    if (result.error) {
      const errorMapping: Record<string, Partial<typeof error>> = {
        NoName: { name: "Name is required" },
        NoEmail: { email: "Email is required" },
        NoUsername: { username: "Username is required" },
        NoPassword: { password: "Password is required" },
        InvalidEmail: { email: "Invalid email format" },
        PasswordTooShort: { password: "Password must be at least 8 characters" },
        UserAlreadyRegistered: {
          email: "Email or Username already registered",
          username: "Email or Username already registered",
        },
        ServerError: { general: "An unexpected error occurred. Please try again later." },
        default: { general: "Something went wrong, please try again." },
      };
      setError(errorMapping[result.error] || errorMapping.default);
    }
  };

  return (
    <div>
      <form className="flex flex-col p-4 gap-4" onSubmit={handleSubmit}>
        {error.general && (
          <div className="text-red-500 text-sm">{error.general}</div>
        )}
        <div>
          <Input
            className="w-full sm:w-[350px] h-[50px]"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
        </div>
        <div>
          <Input
            className="w-full sm:w-[350px] h-[50px]"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
        </div>
        <div>
          <Input
            className="w-full sm:w-[350px] h-[50px]"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          {error.username && (
            <p className="text-red-500 text-xs">{error.username}</p>
          )}
        </div>
        <div className="relative">
          <Input
            className="w-full sm:w-[350px] h-[50px]"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3  sm:right-1 flex items-center text-gray-500 sm:w-[50px] w-auto"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {error.password && (
            <p className="text-red-500 text-xs">{error.password}</p>
          )}
        </div>
        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
};
