import React from "react";
import PageHeader from "@/components/pageHeader";
import { fetchAkunDetail, fetchAkunHeader } from "@/app/lib/akun/data";
import FormEditAkunDetail from "@/components/akun/form/formEditAkunDetail";

const Page = async ({ params }: { params: { id: string } }) => {
  const kodeakun = params.id;
  const dataakundetail = await fetchAkunDetail(kodeakun);
  const akunheader = await fetchAkunHeader();
  const dataakhunheader = akunheader.data;
  return (
    <div className="flex flex-col rounded-lg  justify-center p-2 gap-2">
      <PageHeader title={"Edit Akun"} />
      <FormEditAkunDetail
        dataAkunDetail={dataakundetail.data}
        daftarakunheader={dataakhunheader}
      />
    </div>
  );
};

export default Page;
