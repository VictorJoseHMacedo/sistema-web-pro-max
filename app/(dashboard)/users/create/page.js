"use client";

import PageHeader from "@/components/PageHeader";
import UserForm from "@/components/UserForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const userData = {};
    for (const [key, value] of formData.entries()) {
      userData[key] = value;
    }

    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ocorreu um erro criando usuário!");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        alert("Usuário " + userData.email + " criado com sucesso!");
        setIsLoading(false);
        router.push("/users");
      })
      .catch((err) => {
        alert("Ocorreu um erro, criando o usuário " + userData.email);
        setIsLoading(false);
      });
  };

  return (
    <>
      <PageHeader title="Criar Novo Usuário">
        Aqui você pode criar um novo usuário.
      </PageHeader>

      <section className="mt-8">
        <UserForm onSubmit={handleCreateUser} isLoading={isLoading} />
      </section>
    </>
  );
}
