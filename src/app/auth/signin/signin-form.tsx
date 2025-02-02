"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/server-functions/auth";
import { Eye, EyeOff } from "lucide-react";
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
        <div>
            <form className="flex flex-col p-4 gap-4 w-full" onSubmit={handleSubmit}>
                {error.general && (
                    <div className="text-red-500 text-sm">{error.general}</div>
                )}

                <div>
                    <Input
                        className="w-full sm:w-[350px] h-[50px]"
                        placeholder="Email"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    {error.username && <p className="text-red-500 text-xs">{error.username}</p>}
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
}