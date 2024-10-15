"use client";
import { updateAkunDetail } from "@/app/lib/akun/action";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import Submitbutton from "@/components/submitbutton";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface Props {
  daftarakunheader: AkunHeaderType[];
  dataAkunDetail?: AkunDetailType;
}
function FormEditAkunDetail(props: Props) {
  const kode_akun = props.dataAkunDetail?.kode_akun;
  const nama_akun = props.dataAkunDetail?.nama_akun;
  const kode_akun_header = props.dataAkunDetail?.kode_akun_header || "";
  const [kodeakun, setKodeakun] = useState(kode_akun);
  const [namaakun, setNamaAkun] = useState(nama_akun);
  const [akunHeader, setAkunHeader] = useState<string>(kode_akun_header);
  const [namaakunHeader, setnamaAkunHeader] = useState("");

  const [formState, action] = useFormState(updateAkunDetail, {
    message: "",
  });

  useEffect(() => {
    const findNamaHeader = (kodeakunheader: string) => {
      const data = props.daftarakunheader.filter((el) =>
        el.kode_akun_header.includes(kodeakunheader)
      );
      setnamaAkunHeader(data[0].nama_akun_header);
    };
    findNamaHeader(akunHeader);
  }, [kode_akun_header, akunHeader, props.daftarakunheader]);

  return (
    <form
      action={action}
      className="flex-col space-y-2 sm:w-6/12 bg-primary-50 p-2 rounded-sm shadow-md shadow-primary-50"
    >
      {formState?.message != "" && (
        <div className="flex bg-danger-foreground text-danger-700 p-1 justify-center items-center">
          {formState.message}
        </div>
      )}
      <div className="">
        <div className="w-full">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4"></div>
          <CustomAutoComplete
            name="kode_header"
            data={props.daftarakunheader}
            label="kode akun header"
            value={akunHeader}
            onChange={function (value: string): void {
              setAkunHeader(value);
            }}
          />
        </div>
      </div>
      <div className="">
        <Input
          type="text"
          label="Nama Akun Header"
          size="sm"
          name="nama_akun_header"
          value={namaakunHeader}
          variant="bordered"
          className="bg-foreground-50 rounded-xl"
          isRequired
        />
      </div>
      <div className="">
        <Input
          name="kode_akun"
          type="text"
          label="Kode Akun"
          size="sm"
          variant="bordered"
          className="bg-foreground-50 rounded-xl"
          onChange={(e) => setKodeakun(e.target.value)}
          value={kodeakun}
          isRequired
          readOnly
        />
      </div>
      <div className="">
        <Input
          type="text"
          label="Nama Akun "
          size="sm"
          name="nama_akun"
          variant="bordered"
          className="bg-foreground-50 rounded-xl"
          onChange={(e) => setNamaAkun(e.target.value)}
          value={namaakun}
          isRequired
        />
      </div>
      <div className="flex gap-2">
        <Submitbutton label="Simpan" />
        <Button>Hapus</Button>
      </div>
    </form>
  );
}

export default FormEditAkunDetail;
