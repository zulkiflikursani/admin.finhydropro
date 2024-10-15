import { fetchCustomer, fetchDataProduk } from "@/app/lib/produk/data";
import FormPenjualan from "@/components/penjualan/FormPenjualan";
import React from "react";

async function page() {
  const dataProduk = await fetchDataProduk();
  const dataCustomer = await fetchCustomer();
  return (
    <div>
      <FormPenjualan
        produk={dataProduk?.message}
        customer={dataCustomer?.message}
      />
    </div>
  );
}

export default page;
