import PageHeader from "@/components/PageHeader";
import UsersTable from "@/components/UsersTable";
import React from "react";

export default function page() {
  return (
    <>
      <PageHeader title="Lista de Usuários">
        Aqui você pode visualizar os usuários registrados no sistema
      </PageHeader>

      <section className="mt-8">
        <UsersTable />
      </section>
    </>
  );
}
