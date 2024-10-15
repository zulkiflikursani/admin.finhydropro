"use client";
import { createProduk, updateProduk } from "@/app/lib/produk/action";
import PageHeader from "@/components/pageHeader";
import Submitbutton from "@/components/submitbutton";
import { Input } from "@nextui-org/input";
import React, { act, useState } from "react";
import { useFormState } from "react-dom";

function FormEditProduk({ daftarProduk }: { daftarProduk: ProdukType }) {
  const [kodeProduk, setkodeProduk] = useState(daftarProduk.kode_produk);
  const [namaProduk, setnamaProduk] = useState(daftarProduk.nama_produk);
  const [hebliProduk, sethbeliProduk] = useState<number>(
    daftarProduk.harga_beli
  );
  const [descProduk, setdescProduk] = useState(daftarProduk.deskripsi);
  const [hjualroduk, sethjualProduk] = useState<number>(
    daftarProduk.harga_jual
  );

  const [formState, action] = useFormState(updateProduk, { message: "" });
  return (
    <form className="flex flex-col gap-3 p-2" action={action}>
      <PageHeader title="Tambah Produk" />
      {formState?.message != "" && (
        <div className="flex bg-danger-foreground text-danger-700 p-1 justify-center items-center">
          {formState.message}
        </div>
      )}
      <div className="">
        <Input
          type="text"
          label="Kode Produk"
          size="sm"
          name="kode_produk"
          variant="bordered"
          value={kodeProduk}
          className="bg-foreground-50 rounded-xl"
          onChange={(e) => setkodeProduk(e.target.value)}
          isRequired
          readOnly
        />
      </div>
      <div className="">
        <Input
          type="text"
          label="Nama Produk"
          size="sm"
          name="nama_produk"
          variant="bordered"
          value={namaProduk}
          className="bg-foreground-50 rounded-xl"
          onChange={(e) => setnamaProduk(e.target.value)}
          isRequired
        />
      </div>
      <div className="">
        <Input
          type="text"
          label="Deskripsi"
          size="sm"
          name="deskripsi"
          variant="bordered"
          value={descProduk}
          className="bg-foreground-50 rounded-xl"
          onChange={(e) => setdescProduk(e.target.value)}
          isRequired
        />
      </div>
      <div className="">
        <Input
          type="number"
          label="Harga Beli"
          size="sm"
          name="harga_beli_produk"
          variant="bordered"
          className="bg-foreground-50 rounded-xl"
          value={hebliProduk.toString()}
          onChange={(e) => sethbeliProduk(parseInt(e.target.value))}
          isRequired
        />
      </div>
      <div className="">
        <Input
          type="number"
          label="Harga Jual"
          placeholder="0.00"
          size="sm"
          name="harga_jual_produk"
          variant="bordered"
          value={hjualroduk.toString()}
          className="bg-foreground-50 rounded-xl"
          onChange={(e) => sethjualProduk(Number(e.target.value))}
          isRequired
        />
      </div>
      <div className="flex gap-2">
        <Submitbutton label="Simpan" />
      </div>
    </form>
  );
}

export default FormEditProduk;
