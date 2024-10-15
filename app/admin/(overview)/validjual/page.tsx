import React from "react";
import FromValidasi from "../../../../components/penjualan/FromValidasi";
import { FetchDataPenjualan } from "../../../lib/penjualan/data";

async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    mulai?: string;
    sampai?: string;
  };
}) {
  const query = searchParams?.query || "";
  const mulai = searchParams?.mulai || "";
  const sampai = searchParams?.sampai || "";
  const dataPenjualan = await FetchDataPenjualan(query, mulai, sampai);
  console.log(dataPenjualan);
  return (
    <div>
      <FromValidasi data={dataPenjualan?.data} />
    </div>
  );
}

export default page;
