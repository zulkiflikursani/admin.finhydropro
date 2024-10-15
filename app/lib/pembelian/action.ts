"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { generateJurnal } from "../jurnal/generate";

const schame = z.object({
  kode_transaksi: z
    .string()
    .min(1, { message: "Kode transaksi tidak terdeteksi" }),
  tgl_transaksi: z
    .string()
    .min(1, { message: "Silakan mengisi tanggal transaksi" }),
  company: z.string().min(1, { message: "Perusahaan tidak ditemukan" }),
  user: z.string().min(1, { message: "user tidak ditemukan" }),
  desk: z.string().min(1, { message: "Silahkan mengisi deksripsi transaksi" }),
});
const transaksiDetailSchema = z.object({
  kode_transaksi: z.string().min(1, {
    message: "Kode transaksi tidak terdeteksi",
  }),
  kode_produk: z.string().min(1, {
    message: "Anda belum mengisi produk",
  }),
  qty: z.number().refine((val) => val !== 0, {
    message: "Kuantitas tidak boleh kosong",
  }),
  harga: z.number().refine((val) => val !== 0, {
    message: "Harga tidak boleh kosong",
  }),
});

const schemaDetailTransaksi = z.array(transaksiDetailSchema);

export async function createPembelian(req: TransaksiHeaderType) {
  //   console.log("data-create", req);
  const mapJurnal = await generateJurnal("1");
  const getCurrentTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    };

    return now.toLocaleTimeString("id-ID", options).replace(/[^\d]/g, "");
  };
  const session = await getServerSession(options);
  const prisma = new PrismaClient();
  const tgl_transaksi = req.tgl_transaksi;

  const kode_transaksi = "JP-" + getCurrentTime();
  const company = session?.user.company || "";
  const user = session?.user.email || "";
  const desk = req.deskripsi;
  const dataDetail: TransaksiDetailType[] = await req.data.map((item) => ({
    kode_transaksi: kode_transaksi,
    kode_produk: item.kode_produk,
    qty: item.qty,
    harga: item.harga_beli,
  }));

  const validate = schame.safeParse({
    kode_transaksi: kode_transaksi,
    tgl_transaksi: tgl_transaksi,
    company: company,
    user: user,
    desk: desk,
  });
  const validateDetailTrans = schemaDetailTransaksi.safeParse(dataDetail);
  if (!validate.success) {
    return {
      status: "fail",
      message: validate.error.toString(),
    };
  } else if (!validateDetailTrans.success) {
    return {
      status: "fail",
      message: validateDetailTrans.error.toString(),
    };
  } else {
    const totalPembelian = dataDetail.reduce((total, item) => {
      const temp = item.harga * item.qty;
      return total + temp;
    }, 0);
    const transformJurnal = (item: {
      kode_akun: string;
      posisi: string;
    }): TransaksiDetailJurnalType => {
      let debet = 0;
      let kredit = 0;

      if (item.posisi == "D") {
        debet = totalPembelian;
        kredit = 0;
      } else if (item.posisi == "K") {
        debet = 0;
        kredit = totalPembelian;
      } else {
        debet = 0;
        kredit = 0;
      }

      return {
        kode_transaksi: kode_transaksi,
        no_akun: item.kode_akun,
        debet: debet,
        kredit: kredit,
      };
    };

    const transactionCretePembelian = await prisma.$transaction(async (tx) => {
      try {
        if (mapJurnal.status === "ok") {
          const jurnal = await mapJurnal.message.map(transformJurnal);
          const createJurnalPembelian =
            await tx.tb_transaksi_detail_jurnal.createMany({
              data: jurnal,
            });
          if (createJurnalPembelian.count !== 0) {
            const createDataPembelian = await tx.tb_transaksi_header.create({
              data: {
                kode_transaksi: kode_transaksi,
                company: company,
                tgl_transaksi: tgl_transaksi,
                jenis_transaksi: "1",
                deksripsi: desk,
                user: user,
                status_transaksi: "1",
              },
            });
            if (createDataPembelian) {
              const createPembeliaDetail =
                await tx.tb_transaksi_detail.createMany({
                  data: dataDetail,
                });
              if (createPembeliaDetail.count !== 0) {
                return {
                  status: "ok",
                  message: '[{"message": "Berhasil Menyimpan Data"}]',
                  data: createDataPembelian,
                };
              } else {
                return {
                  status: "fail",
                  message: '[{"message": "Gagal menyimpan data detail"}]',
                };
              }
            }
          } else {
            return {
              status: "fail",
              message: '[{"message": "Gagal menyimpan jurnal pembelian"}]',
            };
          }
        } else {
          return {
            status: "fail",
            message: '[{"message": "Jurnal status is not ok"}]',
          };
        }
      } catch (error) {
        console.log("cratejurnal", error);

        return {
          status: "fail",
          message: '[{"message": "Gagal Menyimpan Data"}]',
        };
      }
    });

    if (transactionCretePembelian?.status == "ok") {
      return {
        status: "ok",
        message: "Berhasil Meyimpan data",
      };
    } else {
      return {
        status: "fail",
        message:
          transactionCretePembelian?.message || "Gagal menyimpan Jurnal !",
      };
    }
  }
}
