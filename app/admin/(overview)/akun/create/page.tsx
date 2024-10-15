import React from "react";
import PageHeader from "@/components/pageHeader";
import { fetchAkunDetail, fetchAkunHeader } from "@/app/lib/akun/data";
import FormEditAkunDetail from "@/components/akun/form/formEditAkunDetail";
import FormAkunDetail from "@/components/akun/create/formAkunDetail";

const Page = async () => {
  const akunheader = await fetchAkunHeader();
  const dataakhunheader = akunheader.data;
  return (
    <div className="flex flex-col rounded-lg  justify-center p-4 gap-0 ">
      <PageHeader title={"Buat Akun"} />
      <FormAkunDetail daftarakunheader={dataakhunheader} />
    </div>
  );
};

export default Page;
