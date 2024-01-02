import PageHeader from "@/components/PageHeader";
import ProductsTable from "@/components/ProductsTable";
import React from "react";

export default function page() {
  return (
    <>
      <PageHeader title="Lista de Produtos">
        Aqui você editar e visualizar os produtos cadastrados no sistema!
      </PageHeader>

      <section className="mt-8">
       <ProductsTable />
      </section>
    </>
  );
}
