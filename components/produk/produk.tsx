import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import PageHeader from "../pageHeader";

import TableProduk from "./tableproduk";

import { fetchDataProduk } from "@/app/lib/produk/data";

async function ProdukPage() {
  const fetcProduk = await fetchDataProduk();

  return (
    <div>
      <PageHeader title={"Produk"} />
      <div className="w-full border border-foreground-200 p-2">
        <div className="mt-3 flex justify-end ">
          <Link href={"/admin/produk/create"}>
            <Button className="bg-primary-500 text-foreground-50">
              Buat Produk
            </Button>
          </Link>
        </div>
        <TableProduk produk={fetcProduk.message} />
      </div>
    </div>
  );
}

export default ProdukPage;
