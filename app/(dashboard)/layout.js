"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <body className="flex flex-col items-center h-[100vh] justify-center">
        <FontAwesomeIcon icon={faCircleNotch} className="w-8 h-8 animate-spin"/>
        <p>Verificando se você está autenticado.</p>
      </body>
    );
  } else if(status === 'authenticated') {
    return (
      <body className="grid [grid-template-columns:250px_1fr] min-h[100vh]">
        <div className="relative">
          <Sidebar />
        </div>
  
        <div>
          <Navbar />
          <main className="mt-16 p-4">{children}</main>
        </div>
      </body>
    );
  } else {
    return router.push('/auth/login')
  }
}
