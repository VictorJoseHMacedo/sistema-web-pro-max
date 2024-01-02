import React, { useState } from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function UserTableRow({ user, i, handleDeleteUser }) {
  const calculateAge = (birthday) => {
    const date = new Date();
    const birthdayDate = new Date(birthday);
    const age = Math.abs(date.getUTCFullYear() - birthdayDate.getUTCFullYear());
    return age;
  };

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <tr data-disabled={isDeleting} 
    data-index={i % 2} 
    className="bg-zinc-300 data-[index='0']:bg-zinc-100 data-[disabled=true]:bg-red-300">
      <td className="p-2">{i}.</td>
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{calculateAge(user.birthday)}</td>
      <td>{user.gender}</td>
      <td>{user.phone}</td>
      <td className="flex gap-2 p-2 text-center">
        <Link
          href={"/users/" + user.email}
          className="bg-sky-500 w-8 h-8 rounded-md text-zinc-900 hover:bg-sky-600 p-1 transition-all"
        >
          <FontAwesomeIcon icon={faPencil} className="w-5" />
        </Link>

        <button
          onClick={() => handleDeleteUser(user.email, setIsDeleting)}
          className="bg-red-500 w-8 h-8 rounded-md text-zinc-900 hover:bg-red-600 p-1 transition-all"
        >
          <FontAwesomeIcon icon={faTrash} className="w-4" />
        </button>
      </td>
    </tr>
  );
}
