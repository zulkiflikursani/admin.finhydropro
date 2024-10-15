"use client";
import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/modal";

import DeleteButtonAkun from "./deletebutton";
import ConfirmAction from "./confirmAction";

import { deleteAkunDetail } from "@/app/lib/akun/action";

interface Props {
  data?: AkunType[];
}
const TableAkun = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState(0);
  const handleClikConfirmYa = async () => {
    if (idToDelete !== 0) {
      const deleteData = await deleteAkunDetail(idToDelete);

      if (deleteData.status === "ok") {
        alert(deleteData.message);
      } else {
        alert(deleteData.message);
      }
      onOpenChange();
    }
  };
  const handleClickDelete = (id: number) => {
    setIdToDelete(id);
    onOpen();
  };

  return (
    <>
      <ConfirmAction
        isOpen={isOpen}
        message="Apakah anda yakin ingin menghapus akun ini ?"
        title="Perhatian"
        onClickYa={() => handleClikConfirmYa()}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />

      <table className="border-collapse border border-foreground-200 mt-5  mb-2 text-foreground-600">
        <thead className="">
          <tr className="">
            <th className="py-2 border border-foreground-200">No</th>
            <th className="border border-foreground-200">KODE HEADER</th>
            <th className="border border-foreground-200">NAMA HEADER</th>
            <th className="border border-foreground-200">NO AKUN</th>
            <th className="border border-foreground-200">NAMA AKUN</th>
            <th className="border border-foreground-200">AKSI</th>
          </tr>
        </thead>
        <tbody className="">
          {props.data?.map((item, i) => (
            <tr key={i} className="hover:bg-primary-200 cursor-pointer">
              <td className="text-center py-2 border border-foreground-200">
                {i + 1}
              </td>
              <td className="text-center border border-foreground-200 ">
                {item.kode_akun_header}
              </td>
              <td className="border border-foreground-200 px-2">
                {item.nama_akun_header}
              </td>
              <td className="text-center border border-foreground-200">
                {item.kode_akun}
              </td>
              <td className="border border-foreground-200 px-2">
                {item.nama_akun}
              </td>
              <td className="border border-foreground-200">
                <div className="flex gap-2 justify-center">
                  <Link href={`/admin/akun/${item.kode_akun}/edit`}>
                    <BsPencilSquare className="h-6 w-6 p-1 bg-primary-500  rounded-sm  text-foreground-200  cursor-pointer hover:text-primary-600 hover:bg-primary-300" />
                  </Link>
                  <DeleteButtonAkun
                    id={item.id}
                    onClick={() => handleClickDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableAkun;
