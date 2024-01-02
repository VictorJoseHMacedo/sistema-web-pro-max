"use client";

import PageHeader from "@/components/PageHeader";
import UserForm from "@/components/UserForm";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {

    fetch("/api/users/" + params.email)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        alert("Ocorreu um erro buscando os usuários");
        console.log(err);
      });
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userData = {};
    for (const [key, value] of formData.entries()) {
      userData[key] = value;
    }

    fetch("/api/users/" + params.email, {
      method: "PATCH",
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Ocorreu um erro alterando o usuário com o email " + params.email
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        alert("Usuário " + userData.email + " alterado com sucesso!");
        router.push("/users");
      })
      .catch((err) => {
        alert("Ocorreu um erro alterando o usuário " + params.email);
      });
  };

  return (
    <>
      <PageHeader title="Editar e Visualizar Usuário">
        Aqui você pode visualizar e editar um usuário registrado no sistema.
      </PageHeader>

      {user && (
        <section className="mt-8">
          <UserForm
            user={user}
            onSubmit={handleUpdateUser}
          />
        </section>
      )}
    </>
  );
}
