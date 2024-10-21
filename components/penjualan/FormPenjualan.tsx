"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "../pageHeader";
import TableInputPenjualan from "./TableInputPenjualan";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { Autocomplete, AutocompleteItem, DateValue } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { createPenjualan } from "@/app/lib/penjualan/action";
import { parseDate } from "@internationalized/date";
interface Props {
  produk: ProdukType[] | undefined;
  customer: CustomerType[] | undefined;
  dataDetailTransaksi?: TransaksiHeaderType[] | null | undefined;
}

const DataDefault: DetailPenjualanType[] = [
  {
    kode_produk: "",
    nama_produk: "",
    qty: -1,
    harga_beli: 0,
    harga_jual: 0,
  },
];
function FormPenjualan(props: Props) {
  const [tanggalTransaksi, settanggalTransaksi] = useState<DateValue | null>();
  const [desc, setDesc] = useState("");
  const [customer, setCustomer] = useState<string>("");
  const [customerSelected, setCustomerSelected] = useState<string>("");
  const [dataPenjualan, setdataPenjualan] =
    useState<DetailPenjualanType[]>(DataDefault);
  const [alertState, setAlert] = useState<any>();
  const [alertStatus, setAlertStatus] = useState("");

  const addItem = () => {
    setdataPenjualan([
      ...dataPenjualan,
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
      setCustomerSelected(props.dataDetailTransaksi[0].user);
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

      setdataPenjualan(allData);
    }
  }, [props.dataDetailTransaksi]);
  const session = useSession();
  const handleClickSimpan = async () => {
    const company = session.data?.user.company || "";
    const user = session.data?.user.email || "";
    const tanggal = tanggalTransaksi?.toString() || "";

    const dataDetail = dataPenjualan.map((item) => ({
      ...item,
      kode_transaksi: "",
      kode_produk: item.kode_produk,
      qty: Number(item.qty),
      harga_jual: Number(item.harga_jual),
      harga_beli: Number(item.harga_beli),
    }));

    if (customer !== "") {
      const newDataSave: TransaksiHeaderType = {
        deskripsi: desc,
        kode_transaksi: "",
        tgl_transaksi: tanggal,
        jenis_transaksi: "1",
        company: company,
        user: customer,
        data: dataDetail,
      };

      setTimeout(async () => {
        console.log("data:", newDataSave);
        const create = await createPenjualan(newDataSave);

        setAlertStatus(create.status);
        if (create.status === "ok") {
          setAlert(create.message);
          setDesc("");
          setdataPenjualan([]);
        } else {
          const errorjson = await JSON.parse(create.message);

          setAlert(errorjson);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    } else {
      setAlert([
        {
          message: "Data Customer Belum diisi",
        },
      ]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  function jumlahTransaksi() {
    const data = dataPenjualan.reduce(
      (total: number, v: DetailPenjualanType) =>
        (total = total + v.harga_jual * -v.qty),
      0
    );

    return data;
  }
  function handleChangeQty(e: number, i: number) {
    setdataPenjualan((prevData) => {
      const newData = [...prevData];

      newData[i].qty = e;

      return newData;
    });
  }

  function handleChangeHjual(e: number, i: number) {
    setdataPenjualan((prevData) => {
      const newData = [...prevData];

      newData[i].harga_jual = e;

      return newData;
    });
  }
  function handleDataCumstomer(e: string) {
    if (props.customer) {
      const datacustomer = props.customer.filter((el: CustomerType) =>
        el.nama.includes(e)
      );
      if (datacustomer.length > 0) {
        setCustomer(e);
        setCustomerSelected(datacustomer[0].email);
      }
    }
  }

  function handleSelectedCustomer(e: string) {
    setCustomer(e);
  }
  function handleData(e: string, i: number) {
    const filterProduk = (array: ProdukType[]) => {
      return array.filter((el: ProdukType) => {
        return el.nama_produk.includes(e);
      });
    };

    if (props.produk !== undefined) {
      const dataProduk: ProdukType[] = filterProduk(props.produk);

      setdataPenjualan((prevData) => {
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
    setdataPenjualan((prevData) =>
      prevData.filter((item) => item.kode_produk != kode_produk)
    );
  }

  return (
    <div>
      <PageHeader title={"INPUT PENJUALAN"} />
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

        <Autocomplete
          isRequired
          className="bg-foreground-50 rounded-xl w-60 mt-2"
          label="Customer"
          defaultItems={props.customer}
          inputValue={customerSelected}
          labelPlacement="inside"
          name={"kode_customer"}
          placeholder="Pilih Customer"
          size="sm"
          variant="bordered"
          onInputChange={(e) => handleDataCumstomer(e)}
          onChange={(e) => setCustomer(e.target.value)}
        >
          {(item) => (
            <AutocompleteItem key={item.id} textValue={item.nama}>
              <div className="flex space-x-1">
                <span>{item.nama}</span>
                {/* <span>:</span> */}
                {/* <span>{item.nama_produk}</span> */}
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
        <div className="flex justify-end mt-2">
          <Button
            className="bg-primary-500 text-foreground-100"
            onClick={addItem}
          >
            Tambah Item
          </Button>
        </div>
        <div className="border-1 border-primary-100 mt-2 shadow-primary-100 p-3 min-h-[300px]">
          <TableInputPenjualan
            dataPenjualan={dataPenjualan}
            handleChangeHjual={handleChangeHjual}
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

export default FormPenjualan;
