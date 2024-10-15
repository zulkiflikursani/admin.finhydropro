"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "../pageHeader";
import TableValidPenjualan from "./TableValidPenjualan";
import {
  getDataCustomer,
  unvalidatePenjualan,
  validatePenjualan,
} from "@/app/lib/penjualan/action";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { usePathname, useSearchParams } from "next/navigation";
import { parseDate } from "@internationalized/date";
interface DataPenjualanType {
  id: number;
  company: string;
  kode_transaksi: string;
  tgl_transaksi: string;
  jenis_transaksi: string;
  deksripsi: string;
  user: string;
  status_transaksi: string;
}
interface PropsType {
  data: DataPenjualanType[] | undefined;
}

function FromValidasi(props: PropsType) {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParam);
  const [mulai, setMulai] = useState(params.get("mulai"));
  const [sampai, setSampai] = useState(params.get("sampai"));
  async function handleValidate(kode_tranasaksi: string) {
    const validate = await validatePenjualan(kode_tranasaksi);
    let dataTransaksi = props.data?.filter(
      (item: DataPenjualanType) => item.kode_transaksi === kode_tranasaksi
    );
    if (validate?.status === "success") {
      if (dataTransaksi !== undefined) {
        const dataCustomer = await getDataCustomer(dataTransaksi[0].user);
        console.log(dataCustomer);
        let phoneTujuan = dataCustomer?.data?.no_telpon;
        if (dataCustomer?.data?.no_telpon.charAt(0) === "6") {
          phoneTujuan = dataCustomer?.data?.no_telpon;
        } else if (dataCustomer?.data?.no_telpon.charAt(0) === "0") {
          phoneTujuan = "62" + dataCustomer.data.no_telpon.slice(1);
        }
        const message = `Purchase Order : ${dataTransaksi[0].kode_transaksi}%0AID Customer : ${dataCustomer?.data?.id}%0ANama Customer: ${dataCustomer?.data?.nama}%0ANo Telpon : ${dataCustomer?.data?.no_telpon}%0A%0ATransaksi%20anda%20telah%20di%20verifikasi.%20Silahkan%20Melakukan%20Pembayaran%20sesuai%20dengan%20invoice%0AKe%20Nomor%20Rekening%20Berikut%0ABRI%20123123123123%20AN%20FinHydroPro%0A%0ATerima%20kasih`;

        const whatsappUrl = `https://wa.me/${phoneTujuan}?text=${message}`;
        window.location.reload();
        window.open(whatsappUrl, "_blank");

        // console.log(validate);
      }
    } else {
    }
  }
  async function handleUnvalidate(kode_tranasaksi: string) {
    const validate = await unvalidatePenjualan(kode_tranasaksi);
    window.location.reload();
  }
  useEffect(() => {
    const today = getTodayDateValue();
    setMulai(today.toString()); // Convert CalendarDate to string
    setSampai(today.toString()); // Convert CalendarDate to string
  }, []);
  const handleChangeMulai = (e: string) => {
    if (e) {
      setMulai(e);
    }
  };
  const handleChangeSampai = (e: string) => {
    if (e) {
      setSampai(e);
    }
  };

  const handleTampilkan = () => {
    if (
      !sampai ||
      !mulai ||
      mulai === "" ||
      sampai === "" ||
      sampai < mulai ||
      sampai === null ||
      mulai === null
    ) {
      alert("Pilih tanggal mulai dan sampai");
    } else {
      window.location.href = `${pathname}?query=${""}&mulai=${mulai}&sampai=${sampai}`;
    }
  };
  const getTodayDateValue = () => {
    const today = new Date();
    return parseDate(today.toISOString().split("T")[0]); // Get today's date as YYYY-MM-DD
  };

  // Function to validate if a date string is in ISO 8601 format
  const isValidDateString = (dateString: any) => {
    // Check if the date string is in the expected format (YYYY-MM-DD)
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD
    return regex.test(dateString);
  };
  const defaultDateValueMulai =
    mulai && isValidDateString(mulai) ? parseDate(mulai) : getTodayDateValue();
  const defaultDateValueSampai =
    sampai && isValidDateString(sampai)
      ? parseDate(sampai)
      : getTodayDateValue();
  return (
    <div>
      <PageHeader title={"VALIDASI PENJUALAN"} />
      <div className="border border-foreground-200 p-2">
        <div className="flex-col space-y-2 ">
          <div className="flex w-full gap-2 p-2 items-center bg-foreground-50 my-2 font-bold px-2 border-1 border-foreground-200 ">
            <DatePicker
              label="Mulai"
              size="sm"
              className="max-w-[284px]"
              defaultValue={defaultDateValueMulai} // Use the URL param or today's date
              onChange={(e) => handleChangeMulai(e.toString())}
            />
            <DatePicker
              label="Sampai"
              size="sm"
              className="max-w-[284px]"
              defaultValue={defaultDateValueSampai} // Use the URL param or today's date
              onChange={(e) => handleChangeSampai(e.toString())}
            />
            <Button className="bg-blue" onClick={() => handleTampilkan()}>
              Tampilkan
            </Button>
          </div>
          <TableValidPenjualan
            data={props.data}
            handleValidate={handleValidate}
            handleUnvalidate={handleUnvalidate}
          />
        </div>
      </div>
    </div>
  );
}

export default FromValidasi;
