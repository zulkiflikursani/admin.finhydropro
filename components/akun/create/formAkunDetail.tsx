"use client";
import { createAkunDetail } from "@/app/lib/akun/action";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import Submitbutton from "@/components/submitbutton";
import { button, Input } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import errorMap from "zod/lib/locales/en";

interface Props {
  daftarakunheader: AkunHeaderType[];
  dataAkunDetail?: AkunDetailType;
}
function FormAkunDetail(props: Props) {
  const kode_akun = props.dataAkunDetail?.kode_akun;
  const nama_akun = props.dataAkunDetail?.nama_akun;
  const kode_akun_header = props.dataAkunDetail?.kode_akun_header || "";
  const [kodeakun, setKodeakun] = useState(kode_akun);
  const [namaakun, setNamaAkun] = useState(nama_akun);
  const [akunHeader, setAkunHeader] = useState<string>("");
  const [namaakunHeader, setnamaAkunHeader] = useState("");

  const [formState, action] = useFormState(createAkunDetail, { message: "" });
  const [errorState, setError] = useState<any>();

  useEffect(() => {
    if (formState.message !== "success" && formState.message !== "") {
      if (formState.message === "duplicate") {
        setError([
          {
            message: "No akun sudah digunakan",
          },
        ]);
      } else {
        const errorjson = JSON.parse(formState.message);
        setError(errorjson);
      }
    }
  }, [formState]);

  useEffect(() => {
    const findNamaHeader = (kodeakunheader: string) => {
      if (kodeakunheader != "") {
        const data = props.daftarakunheader.filter((el) =>
          el.kode_akun_header.includes(kodeakunheader)
        );
        setnamaAkunHeader(data[0]?.nama_akun_header);
      }
    };
    findNamaHeader(akunHeader);
  }, [kode_akun_header, akunHeader, props.daftarakunheader]);

  return (
    <div className="border-1 border-foreground-200 w-full">
      <form
        action={action}
        className="flex-col space-y-2 sm:w-6/12 p-2 rounded-sm"
      >
        <div className="flex-col bg-danger-foreground text-danger-700 p-1 justify-center items-center">
          {errorState !== undefined
            ? errorState.map((item: { message: string }, i: number) => (
                <div key={i}>{item.message}</div>
              ))
            : ""}
        </div>
        <div className="">
          <div className="w-full">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4"></div>
            <CustomAutoComplete
              name="kode_header"
              data={props.daftarakunheader}
              label="kode akun header"
              value={""}
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
          {/* <Button>Hapus</Button> */}
        </div>
      </form>
    </div>
  );
}

export default FormAkunDetail;
