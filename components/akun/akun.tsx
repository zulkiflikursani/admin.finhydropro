import { Suspense } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import PageHeader from "../pageHeader";

import TableAkun from "./table";
import Search from "./search";
import Pagination from "./pagination";

import { fetchDataAkun } from "@/app/lib/akun/data";

interface FetchDataAkunResponse {
  statusCode: number;
  data?: AkunType[];
  totalPage?: number;
}
const Akun = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const res: FetchDataAkunResponse = await fetchDataAkun(query, currentPage);

  return (
    <>
      <PageHeader title={"DAFTAR AKUN"} />
      <div className="border-1 border-foreground-200 w-full p-2">
        <div className="flex flex-col justify-center  ">
          <div className="flex space-x-3">
            <Search placeholder="Cari nama perkiraan... " />
            <Link href={"/admin/akun/create"}>
              <Button className="bg-primary-500 text-foreground-50">
                Buat Akun
              </Button>
            </Link>
          </div>
          <Suspense>
            <TableAkun data={res.data} />
          </Suspense>
          <div className="flex justify-center items-center">
            <Pagination totalPages={res.totalPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Akun;
