"use client";
import { signOut } from "next-auth/react";
import React from "react";

function ButtonLogout() {
  return (
    <div
      className="text-center rounded-full shadow-md shadow-gray-500 cursor-pointer bg-green-500 py-1 w-full active:bg-green-400"
      onClick={() => signOut()}
    >
      logout
    </div>
  );
}

export default ButtonLogout;
