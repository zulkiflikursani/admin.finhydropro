"use client";
import { createProduk } from "@/app/lib/produk/action";
import PageHeader from "@/components/pageHeader";
import Submitbutton from "@/components/submitbutton";
import { Input } from "@nextui-org/input";
import React, { act, useState } from "react";
import { useFormState } from "react-dom";

function FormCreateProduk() {
  const [kodeProduk, setkodeProduk] = useState("");
  const [namaProduk, setnamaProduk] = useState("");
  const [descProduk, setdescProduk] = useState("");
  const [hebliProduk, sethbeliProduk] = useState<number>(0);
  const [hjualroduk, sethjualProduk] = useState<number>(0);

  const [formState, action] = useFormState(createProduk, { message: "" });
  return (
    <form className="flex flex-col" action={action}>
      <PageHeader title="Tambah Produk" />
      <div className="flex-col space-y-2 p-2 border border-foreground-200">
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
            className="bg-foreground-50 rounded-xl"
            onChange={(e) => setkodeProduk(e.target.value)}
            isRequired
          />
        </div>
        <div className="">
          <Input
            type="text"
            label="Nama Produk"
            size="sm"
            name="nama_produk"
            variant="bordered"
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
            className="bg-foreground-50 rounded-xl"
            onChange={(e) => sethjualProduk(Number(e.target.value))}
            isRequired
          />
        </div>
        <div className="flex gap-2">
          <Submitbutton label="Simpan" />
        </div>
      </div>
    </form>
  );
}

export default FormCreateProduk;
