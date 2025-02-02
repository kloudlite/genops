"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/server-functions/auth";

import { useState } from "react";

export const SignupForm = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();
  return (
    <div>
      <form
        className="flex flex-col p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await signup(data);
          setError(result.error);
          console.log(result)
        }}
      >
        <Input
          placeholder="Name"
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <Input
          placeholder="Email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <Input
          placeholder="Username"
          value={data.username}
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
};
