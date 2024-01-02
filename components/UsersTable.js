"use client";

import { useEffect, useState } from "react";
import UserTableRow from "./UserTableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        console.log(data.users);
      })
      .catch((err) => {
        alert("Ocorreu um erro buscando os usuários");
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const handleDeleteUser = (email, setIsDeleting) => {
    setIsDeleting(true);
    fetch("/api/users/" + email, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Ocorreu um erro ao apagar o usuário com o email " + email
          );
        } else {
          return res;
        }
      })
      .then((data) => {
        setIsDeleting(false);
        const newUsers = users.filter((user) => user.email !== email);
        setUsers(newUsers);
      })
      .catch((err) => {
        alert("Ocorreu um erro excluindo o usuário " + email);
        setIsDeleting(false);
      });
  };

  return (
    <>
      <p className="mb-4">Usuários totais: {users.length}</p>

      <table className="w-full">
        <thead className="bg-zinc-700 text-white">
          <tr className="text-left">
            <th></th>
            <th className="p-2">Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Idade</th>
            <th>Gênero</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <UserTableRow
                key={user._id}
                user={user}
                i={i + 1}
                handleDeleteUser={handleDeleteUser}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
