"use client";

import { Credentials } from "@/app/models/credentials";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FunctionComponent, useState } from "react";

const SignInPage: FunctionComponent = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInResponse = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    if (signInResponse?.error) {
      alert('Invalid username or password');
    } else {
      router.replace("/create-post");
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <h2>Login to create posts</h2>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Enter username"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter password"
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignInPage;
