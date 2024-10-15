"use client";
import { Button } from "@nextui-org/button";
import React from "react";
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
  handleValidate: (e: string) => void;
  handleUnvalidate: (e: string) => void;
}
function TableValidPenjualan(data: PropsType) {
  return (
    <>
      <table className="w-full border-collapse border border-foreground-200 mt-5  mb-2 text-foreground-600">
        <thead>
          <tr>
            <th className="py-2 border border-foreground-200">No</th>
            <th className="border border-foreground-200">Tanggal Transaksi</th>
            <th className="border border-foreground-200">Kode Transaksi</th>
            <th className="border border-foreground-200">Customer</th>
            <th className="border border-foreground-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.data !== undefined
            ? data.data.map((item: DataPenjualanType, i: number) => (
                <tr
                  key={item.id}
                  className="hover:bg-primary-200 cursor-pointer"
                >
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
                    {item.user}
                  </td>
                  <td className="text-center border border-foreground-200 items-center">
                    {item.status_transaksi === "1" ? (
                      <Button
                        color="warning"
                        size="sm"
                        onClick={(e) =>
                          data.handleUnvalidate(item.kode_transaksi)
                        }
                      >
                        Unvalidasi
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        size="sm"
                        onClick={(e) =>
                          data.handleValidate(item.kode_transaksi)
                        }
                      >
                        Validasi
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
}

export default TableValidPenjualan;
