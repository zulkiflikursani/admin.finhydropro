import { fetchDataProduk } from "@/app/lib/produk/data";
import FormPembelian from "@/components/pembelian/formPembelian";
import React from "react";

async function page() {
  const dataProduk = await fetchDataProduk();
  return (
    <div className="p-2">
      <FormPembelian produk={dataProduk?.message} />
    </div>
  );
}

export default page;
