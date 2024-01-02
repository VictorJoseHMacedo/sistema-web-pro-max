import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

export default function ProductTableRow({ i, product, handleDeleteProduct }) {
  const formatNumbers = (value) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <tr data-disabled={isDeleting} data-index={i % 2} className="data-[disabled=true]:bg-red-300 bg-zinc-300 data-[index='0']:bg-zinc-100">
      <td className="p-2">{i}.</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.quantity}</td>
      <td>{formatNumbers(product.cost)}</td>
      <td>{formatNumbers(product.totalCost)}</td>
      <td>{formatNumbers(product.price)}</td>
      <td>{formatNumbers(product.totalPrice)}</td>
      <td className="flex gap-2 p-2 text-center">
        <Link
          href={"/products/" + product._id}
          className="bg-sky-500 w-8 h-8 rounded-md text-zinc-900 hover:bg-sky-600 p-1 transition-all"
        >
          <FontAwesomeIcon icon={faPencil} className="w-5" />
        </Link>

        <button
          onClick={() => handleDeleteProduct(product._id, setIsDeleting)}
          className="bg-red-500 w-8 h-8 rounded-md text-zinc-900 hover:bg-red-600 p-1 transition-all"
        >
          <FontAwesomeIcon icon={faTrash} className="w-4" />
        </button>
      </td>
    </tr>
  );
}
