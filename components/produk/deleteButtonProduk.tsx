import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const DeleteButtonProduk = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button onClick={onClick}>
        <FaTrashAlt className="h-6 w-6 p-1 bg-danger-600 text-foreground-200 dark:text-black rounded-sm cursor-pointer hover:text-primary-600 hover:bg-danger-300" />
      </button>
    </>
  );
};

export default DeleteButtonProduk;
