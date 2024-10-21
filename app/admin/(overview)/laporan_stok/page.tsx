import { FetchDataDetailTransaksi } from "@/app/lib/penjualan/data";

import TabelDetailStok from "@/components/stok/TabelDetailStok";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    mulai?: string;
    sampai?: string;
  };
}) => {
  const query = searchParams?.query || "";
  // const currentPage = searchParams?.page || 1;
  const mulai = searchParams?.mulai || "";
  const sampai = searchParams?.sampai || "";
  const data = await FetchDataDetailTransaksi(query, mulai, sampai);
  console.log(data);

  return (
    <div className="flex flex-col rounded-lg  justify-center p-2">
      <TabelDetailStok data={data.data} />
    </div>
  );
};

export default page;
