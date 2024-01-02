"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage("");

    signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      redirect: false,
    })
      .then((res) => {
        setIsLoading(false);

        if (res.error === "CredentialsSignin") {
          return setMessage("Email e/ou Senha Errada!");
        } else if (res.error) {
          return setMessage("Ocorreu um erro, tente novamente!");
        }

        router.push("/");
      })
      .catch((err) => alert("erro"));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full">
      <label htmlFor="email" className="block text-white">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        ref={emailRef}
        className="w-full p-2"
      />

      <label htmlFor="email" className="block text-white mt-4">
        Senha
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="w-full p-2"
        ref={passwordRef}
      />
      <button
        disabled={isLoading}
        className="bg-sky-500 hover:bg-sky-600 transition-all p-2 text-white mt-6 disabled:bg-zinc-500 w-full"
      >
        Entrar
      </button>

      {message && <p className="text-red-500 text-center mt-4">{message}</p>}

      <Link
        href="/auth/forgot-password"
        className="text-center mt-4 block text-sky-500 hover:underline"
      >
        Esqueceu a senha?
      </Link>
    </form>
  );
}
