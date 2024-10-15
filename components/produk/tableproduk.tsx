"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/modal";

import DeleteButtonProduk from "../produk/deleteButtonProduk";
import ConfirmAction from "../akun/confirmAction";

import { deleteProdukById } from "@/app/lib/produk/action";

function TableProduk({ produk }: { produk: ProdukType[] | undefined }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [idToDelete, setidToDelete] = useState(0);

  function handleClickDelete(id: number): void {
    setidToDelete(id);
    onOpen();
  }

  const handleClikConfirmYa = async () => {
    if (idToDelete !== 0) {
      const deleteProduk = await deleteProdukById(idToDelete);

      if (deleteProduk?.status === "ok") {
        alert(deleteProduk.message);
      } else {
        alert(deleteProduk?.message);
      }
      onOpenChange();
    }
  };

  return (
    <>
      <ConfirmAction
        isOpen={isOpen}
        message="Apakah anda yakin ingin menghapus produk ini ?"
        title="Perhatian"
        onClickYa={() => handleClikConfirmYa()}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <table className="table-auto border border-foreground-200 my-2 w-full">
        <thead className="border border-foreground-200 ">
          <tr>
            <th className="border border-foreground-200 py-2">No</th>
            <th className="border border-foreground-200">Kode Produk</th>
            <th className="border border-foreground-200">Nama Produk</th>
            <th className="border border-foreground-200">Dekskripsi Produk</th>
            <th className="border border-foreground-200">Harga Beli</th>
            <th className="border border-foreground-200">Harga Jual</th>
            <th className="border border-foreground-200">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y-1 divide-primary-100">
          {produk?.map((item, i) => (
            <tr key={i} className="hover:bg-primary-200 cursor-pointer">
              <td className="text-center py-2 border border-foreground-200">
                {i + 1}
              </td>
              <td className="text-center border border-foreground-200">
                {item.kode_produk}
              </td>
              <td className="border border-foreground-200 px-2">
                {item.nama_produk}
              </td>
              <td className="border border-foreground-200 px-2">
                {item.deskripsi}
              </td>
              <td className="text-center border border-foreground-200">
                {item.harga_beli}
              </td>
              <td className="text-center border border-foreground-200">
                {item.harga_jual}
              </td>
              <td>
                <div className="flex gap-2 justify-center">
                  <Link href={`/admin/produk/${item.id}/edit`}>
                    <BsPencilSquare className="h-6 w-6 p-1 bg-primary-500  rounded-sm  text-foreground-200  cursor-pointer hover:text-primary-600 hover:bg-primary-300" />
                  </Link>
                  <DeleteButtonProduk
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
}

export default TableProduk;
