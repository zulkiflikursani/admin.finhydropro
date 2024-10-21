import { FetchDataDetailTransaksi } from "@/app/lib/pembelian/data";
import { fetchDataProduk } from "@/app/lib/produk/data";
import FormPembelian from "@/components/pembelian/formPembelian";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const kode_transaksi = params.id;
  console.log("kode_transaksi", kode_transaksi);
  const dataProduk = await fetchDataProduk();

  const response = await FetchDataDetailTransaksi(kode_transaksi);
  let transaksiHeaders: TransaksiHeaderType[] | null = null;

  if (response.data) {
    transaksiHeaders = response.data.map((detailTransaksi) => ({
      company: detailTransaksi.company,
      kode_transaksi: detailTransaksi.kode_transaksi,
      tgl_transaksi: detailTransaksi.tgl_transaksi,
      jenis_transaksi: detailTransaksi.jenis_transaksi,
      deskripsi: detailTransaksi.deksripsi,
      user: detailTransaksi.user,
      data: [
        {
          kode_produk: detailTransaksi.kode_produk,
          nama_produk: detailTransaksi.nama_produk,
          qty: detailTransaksi.qty,
          harga_beli: detailTransaksi.harga_beli,
          harga_jual: detailTransaksi.harga_jual,
        },
      ],
    }));
    // do something with transaksiHeaders
  } else {
    console.log("response.data is undefined", response.data);
    // handle the case where response.data is undefined
  }
  return (
    <div className="p-2">
      <FormPembelian
        produk={dataProduk?.message}
        dataDetailTransaksi={transaksiHeaders}
      />
    </div>
  );
}

export default page;
