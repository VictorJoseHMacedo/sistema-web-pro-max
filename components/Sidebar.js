"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  faCartShopping,
  faMoneyBill,
  faTruckFast,
  faUsers,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="bg-zinc-900 fixed h-full p-4 w-[250px] text-white">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={150}
          height={150}
          className="block mx-auto"
        />
      </Link>

      <nav className="mt-8">
        <ul>
          {items.map((item, i) => {
            if (session?.user.role !== "admin" && item.name == "Usuários") {
              return;
            } else {
              return <SidebarItem item={item} />;
            }
          })}
        </ul>
      </nav>
    </aside>
  );
}

const items = [
  {
    name: "Usuários",
    icon: faUsers,
    subMenus: [
      {
        name: "Criar Usuário",
        href: "/users/create",
      },
      {
        name: "Lista de Usuários",
        href: "/users",
      },
    ],
  },
  {
    name: "Produtos",
    icon: faCartShopping,
    subMenus: [
      {
        name: "Criar Produto",
        href: "/products/create",
      },
      {
        name: "Lista Produtos",
        href: "/products",
      },
    ],
  },
  {
    name: "Vendas",
    icon: faMoneyBill,
    subMenus: [
      {
        name: "Criar Usuário",
        href: "/users/create",
      },
      {
        name: "Lista Clientes",
        href: "/users",
      },
    ],
  },
  {
    name: "Fornecedores",
    icon: faTruckFast,
    subMenus: [
      {
        name: "Criar Usuário",
        href: "/users/create",
      },
      {
        name: "Lista Clientes",
        href: "/users",
      },
    ],
  },
  {
    name: "Depósitos",
    icon: faWarehouse,
    subMenus: [
      {
        name: "Criar Usuário",
        href: "/users/create",
      },
      {
        name: "Lista Clientes",
        href: "/users",
      },
    ],
  },
];
