"use client";

import PageHeader from "@/components/PageHeader";
import ProductForm from "@/components/ProductForm";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [product, setProduct] = useState();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
      })
      .catch((err) => {
        alert("Ocorreu um erro buscando os produtos");
        console.log(err);
      });
  }, []);

  const formatNumbers = (value) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const productData = {};
    for (const [key, value] of formData.entries()) {
      productData[key] = value;
    }

    fetch("/api/products/" + params.id, {
      method: "PATCH",
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Ocorreu um erro alterando o produto com o ID " + params.id
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        alert("Produto: " + productData.name + " alterado com sucesso!");
        router.push("/products");
      })
      .catch((err) => {
        alert("Ocorreu um erro alterando o produto com o ID: " + params.id);
      });
  };

  return (
    <>
      <PageHeader title="Editar e Visualizar Produto">
        Aqui você pode visualizar e editar um produto registrado no sistema.
      </PageHeader>

      {product && (
        <section className="mt-8 flex gap-4">
          {" "}
          <ProductForm product={product} onSubmit={handleUpdateProduct} />
          <div>
            <ul>
              <li>
                <b>Custo Total(R$): </b>
                {formatNumbers(product.totalCost)}
              </li>
              <li>
                <b>Preço Total(R$): </b>
                {formatNumbers(product.totalCost)}
              </li>
              <li>
                <b>Adicionado por: </b>
                {product.user?.firstName + " " + product.user?.lastName}
              </li>
              <li>
                <b>Email do usuário: </b>
                {product.user.email}
              </li>
              <li>
                <b>Criado em: </b>
                {product.createdAt.split("T")[0]}
              </li>
              <li>
                <b>Alterado em: </b>
                {product.updatedAt.split("T")[0]}
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
