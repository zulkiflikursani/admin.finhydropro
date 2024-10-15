"use client";
import React, { use, useEffect, useState } from "react";
import PageHeader from "../pageHeader";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { usePathname, useSearchParams } from "next/navigation";
import { parseDate } from "@internationalized/date"; // or your specific date utility

interface TypeDetailTransaksi {
  id: number;
  company: string;
  kode_transaksi: string;
  tgl_transaksi: string;
  jenis_transaksi: string;
  deksripsi: string;
  user: string;
  status_transaksi: string;
  kode_produk: string;
  qty: number;
  harga: number;
}
interface Props {
  data: TypeDetailTransaksi[] | undefined;
}
function TabelDetailTransaksi(props: Props) {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParam);
  const [mulai, setMulai] = useState(params.get("mulai"));
  const [sampai, setSampai] = useState(params.get("sampai"));
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

  useEffect(() => {
    const today = getTodayDateValue();
    setMulai(today.toString()); // Convert CalendarDate to string
    setSampai(today.toString()); // Convert CalendarDate to string
  }, []);

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
    <>
      <PageHeader title={"LAPORAN"} />
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
      <div className="border border-foreground-200 p-2">
        <table className=" w-full border-collapse border border-foreground-200 mt-5  mb-2 text-foreground-600">
          <thead>
            <tr>
              <th className="py-2 border border-foreground-200">No</th>
              <th className="border border-foreground-200">Tgl Transaksi</th>
              <th className="border border-foreground-200">Kode Transaksi</th>
              <th className="border border-foreground-200">desk</th>
              <th className="border border-foreground-200">qty</th>
              <th className="border border-foreground-200">harga</th>
              <th className="border border-foreground-200">total</th>
            </tr>
          </thead>
          <tbody>
            {props.data?.map((item: TypeDetailTransaksi, i: number) => (
              <tr key={item.id} className="hover:bg-primary-200 cursor-pointer">
                <td className="text-center border border-foreground-200 ">
                  {i++ + 1}
                </td>
                <td className="text-center border border-foreground-200 ">
                  {item.tgl_transaksi}
                </td>
                <td className="text-center border border-foreground-200 ">
                  {item.kode_transaksi}
                </td>
                <td className="text-center border border-foreground-200 ">
                  {item.deksripsi}
                </td>
                <td className="text-center border border-foreground-200 ">
                  {Intl.NumberFormat().format(-item.qty)}
                </td>
                <td className="text-center border border-foreground-200 ">
                  {Intl.NumberFormat().format(item.harga)}
                </td>
                <td className="text-center border border-foreground-200 ">
                  {Intl.NumberFormat().format(-item.harga * item.qty)}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={4}
                className="text-center border border-foreground-200 "
              ></td>
              <td className="text-center border border-foreground-200 ">
                {Intl.NumberFormat().format(
                  props.data?.reduce((acc, item: TypeDetailTransaksi) => {
                    return (acc += -item.qty);
                  }, 0) || 0
                )}
              </td>
              <td className="text-center border border-foreground-200 "></td>
              <td className="text-center border border-foreground-200 ">
                {Intl.NumberFormat("id-ID", {
                  // Use your desired locale here
                  style: "currency",
                  currency: "IDR", // Adjust currency as needed
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(
                  props.data?.reduce(
                    (acc: number, item: TypeDetailTransaksi) => {
                      return acc + -item.qty * item.harga; // Sum up the total amount
                    },
                    0
                  ) || 0 // Default to 0 if props.data is undefined or empty
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TabelDetailTransaksi;
