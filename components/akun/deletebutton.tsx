"use client";
import { deleteAkunDetail } from "@/app/lib/akun/action";
import { Card } from "@nextui-org/card";
import React, { useState, MouseEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";

const DeleteButtonAkun = ({
  id,
  onClick,
}: {
  id: number;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <FaTrashAlt className="h-6 w-6 p-1 bg-danger-500 text-foreground-200 dark:text-black rounded-sm cursor-pointer hover:text-primary-600 hover:bg-danger-300" />
    </button>
  );
};

export default DeleteButtonAkun;
