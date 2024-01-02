"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="h-[100vh] flex flex-col items-center">
      <div>
        <Image
          src="/images/logo.png"
          width={300}
          height={300}
          className="bg-zinc-900 block mx-auto p-2 rounded-md"
          alt="Logo Site"
        />
      </div>
      <p className="mt-8">
        Olá {session?.user.name}, Seja bem vindo(a) de volta!
      </p>
    </div>
  );
}
