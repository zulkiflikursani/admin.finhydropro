import { getProdukDetail } from "@/app/lib/produk/data";
import FormEditAkunDetail from "@/components/akun/form/formEditAkunDetail";
import FormEditProduk from "@/components/produk/edit/formEditProduk";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const getProduk = await getProdukDetail(Number(params.id));
  const data = getProduk.data;
  return (
    <div>
      <FormEditProduk daftarProduk={data} />
    </div>
  );
}

export default page;
