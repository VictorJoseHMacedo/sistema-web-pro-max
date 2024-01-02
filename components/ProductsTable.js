"use client";

import React, { useEffect, useState } from "react";
import ProductTableRow from "./ProductTableRow";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    setIsLoadingProducts(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(data.users);
      })
      .catch((err) => {
        alert("Ocorreu um erro buscando os produtos");
        setIsLoadingProducts(false);
        console.log(err);
      });
  }, []);


  const handleDeleteProduct = (id, setIsDeleting) => {
    setIsDeleting(true);
    fetch("/api/products/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Ocorreu um erro ao apagar o produto com o id " + id
          );
        } else {
          return res;
        }
      })
      .then((data) => {
        setIsDeleting(false);
        const newProduct = products.filter((product) => product._id !== id);
        setProducts(newProduct);
      })
      .catch((err) => {
        alert("Ocorreu um erro excluindo o produto com o id " + id);
        setIsDeleting(false);
      });
  };

  return (
    <>
      <p className="mb-4">Produtos totais: {products?.length}</p>
      <table className="w-full">
        <thead className="bg-zinc-700 text-white">
          <tr className="text-left">
            <th></th>
            <th className="p-2">Nome</th>
            <th>Categoria</th>
            <th>Qtd</th>
            <th>Custo(R$)</th>
            <th>Custo/Total</th>
            <th>Preço(R$)</th>
            <th>Preço/Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, i) => {
              return (
                <ProductTableRow
                  key={product._id}
                  i={i + 1}
                  product={product}
                  handleDeleteProduct={handleDeleteProduct}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
}
