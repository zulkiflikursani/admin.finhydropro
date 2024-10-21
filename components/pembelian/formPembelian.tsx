"use client";
import { DatePicker } from "@nextui-org/date-picker";
import { DateValue } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import PageHeader from "../pageHeader";

import TableInputPembelian from "./tableInputPembelian";

import { createPembelian } from "@/app/lib/pembelian/action";
import { parseDate } from "@internationalized/date";

interface Props {
  produk: ProdukType[] | undefined;
  dataDetailTransaksi?: TransaksiHeaderType[] | null | undefined;
}

const DataDefault: DetailPembelianType[] = [
  {
    kode_produk: "",
    nama_produk: "",
    qty: 1,
    harga_beli: 0,
    harga_jual: 0,
  },
];

const defaultDataSave: TransaksiHeaderType = {
  tgl_transaksi: "",
  kode_transaksi: "",
  company: "",
  jenis_transaksi: "",
  deskripsi: "",
  user: "",
  data: [
    {
      kode_produk: "",
      nama_produk: "",
      qty: 0,
      harga_beli: 0,
      harga_jual: 0,
    },
  ],
};

function FormPembelian(props: Props) {
  const [tanggalTransaksi, settanggalTransaksi] = useState<DateValue | null>();
  const [desc, setDesc] = useState("");
  const [dataPemelian, setdataPemelian] =
    useState<DetailPembelianType[]>(DataDefault);
  const [alertState, setAlert] = useState<any>();
  const [alertStatus, setAlertStatus] = useState("");
  const addItem = () => {
    setdataPemelian([
      ...dataPemelian,
      {
        kode_produk: "",
        nama_produk: "",
        qty: 1,
        harga_beli: 0,
        harga_jual: 0,
      },
    ]);
  };
  useEffect(() => {
    if (props.dataDetailTransaksi && props.dataDetailTransaksi[0]) {
      settanggalTransaksi(
        parseDate(props.dataDetailTransaksi[0].tgl_transaksi)
      );
      setDesc(props.dataDetailTransaksi[0].deskripsi);
      const allData = props.dataDetailTransaksi.reduce(
        (acc: TransaksiDetailDataType[], item) => {
          return acc.concat(
            item.data.map((data: TransaksiDetailDataType) => ({
              kode_produk: data.kode_produk,
              nama_produk: data.nama_produk,
              qty: data.qty,
              harga_beli: data.harga_beli,
              harga_jual: data.harga_jual,
            }))
          );
        },
        [] as TransaksiDetailDataType[]
      );

      setdataPemelian(allData);
    }
  }, [props.dataDetailTransaksi]);

  const session = useSession();
  const handleClickSimpan = async () => {
    const company = session.data?.user.company || "";
    const user = session.data?.user.email || "";
    const tanggal = tanggalTransaksi?.toString() || "";
    const dataDetail = dataPemelian.map((item) => ({
      ...item,
      kode_transaksi: "",
      kode_produk: item.kode_produk,
      qty: Number(item.qty),
      harga: Number(item.harga_beli),
    }));

    const newDataSave: TransaksiHeaderType = {
      deskripsi: desc,
      kode_transaksi: "",
      tgl_transaksi: tanggal,
      jenis_transaksi: "1",
      company: company,
      user: user,
      data: dataDetail,
    };

    setTimeout(async () => {
      console.log("data:", newDataSave);
      const create = await createPembelian(newDataSave);

      setAlertStatus(create.status);
      if (create.status === "ok") {
        setAlert(create.message);
        setDesc("");

        setdataPemelian([]);
      } else {
        const errorjson = await JSON.parse(create.message);

        setAlert(errorjson);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  function jumlahTransaksi() {
    const data = dataPemelian.reduce(
      (total: number, v: DetailPembelianType) =>
        (total = total + v.harga_beli * v.qty),
      0
    );

    return data;
  }
  function handleChangeQty(e: number, i: number) {
    setdataPemelian((prevData) => {
      const newData = [...prevData];

      newData[i].qty = e;

      return newData;
    });
  }

  function handleChangeHbeli(e: number, i: number) {
    setdataPemelian((prevData) => {
      const newData = [...prevData];

      newData[i].harga_beli = e;

      return newData;
    });
  }
  function handleData(e: string, i: number) {
    const filterProduk = (array: ProdukType[]) => {
      return array.filter((el: ProdukType) => {
        return el.nama_produk.includes(e);
      });
    };

    if (props.produk !== undefined) {
      const dataProduk: ProdukType[] = filterProduk(props.produk);

      setdataPemelian((prevData) => {
        const newData = [...prevData];

        newData[i].nama_produk = e;
        newData[i].kode_produk = dataProduk[0]?.kode_produk;
        newData[i].harga_beli = dataProduk[0]?.harga_beli;
        newData[i].harga_jual = dataProduk[0]?.harga_jual;
        return newData;
      });
    }
  }

  function handleDeleteItem(kode_produk: string) {
    setdataPemelian((prevData) =>
      prevData.filter((item) => item.kode_produk != kode_produk)
    );
  }

  return (
    <div>
      <PageHeader title={"INPUT PEMBELIAN"} />
      <div className="border border-foreground-200 p-2">
        <div className="flex-col space-y-2 ">
          {alertState !== "" ? (
            alertStatus === "ok" ? (
              <div className="flex flex-col bg-primary-200 mt-2 py-2 px-2 text-foreground-50">
                {alertState}
              </div>
            ) : alertState != undefined ? (
              alertState.map((item: { message: string }, i: number) => (
                <div
                  key={i}
                  className="flex flex-col bg-danger-200 mt-2 py-2 px-2 text-danger-600"
                >
                  {item.message}
                </div>
              ))
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <DatePicker
            isRequired
            className="max-w-[284px]"
            label="Tanggal Transaksi"
            size="sm"
            value={tanggalTransaksi}
            variant="bordered"
            onChange={(e) => settanggalTransaksi(e)}
          />
          <Input
            isRequired
            className="max-w-6/12"
            label="Deskripsi"
            placeholder="Masukkan dekskripsi transaksi..."
            size="sm"
            type="text"
            value={desc}
            variant="bordered"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button
            className="bg-primary-500 text-foreground-100"
            onClick={addItem}
          >
            Tambah Item
          </Button>
        </div>
        <div className="border-1 border-primary-100 mt-2 shadow-primary-100 p-3 min-h-[300px]">
          <TableInputPembelian
            dataPembelian={dataPemelian}
            handleChangeHbeli={handleChangeHbeli}
            handleChangeQty={handleChangeQty}
            handleData={handleData}
            handleDeleteItem={handleDeleteItem}
            produk={props.produk}
          />
        </div>
        <div className="flex justify-between items-center px-4 py-2 ">
          <label>Total Pembelian</label>
          <Input
            className="w-3/12"
            type="text"
            value={jumlahTransaksi().toString()}
          />
        </div>
        <div className="flex justify-end px-4">
          <Button
            className="bg-primary-400 text-foreground-100 px-4"
            onClick={handleClickSimpan}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormPembelian;
