"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { generateJurnal } from "../jurnal/generate";
interface TypeTransaksiHeader {
  company: string;
  kode_transaksi: string;
  tgl_transaksi: string;
  jenis_transaksi: string;
  deksripsi: string;
  user: string;
  status_transaksi: string;
}
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

interface TypeTransaksiDetailJurnal {
  kode_transaksi: string;
  no_akun: string;
  debet: number;
  kredit: number;
}
interface TypeMapingTransaksi {
  jenis_transaksi: string;
  kode_akun: string;
  posisi: string;
}
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
  harga_jual: z.number().refine((val) => val !== 0, {
    message: "Harga tidak boleh kosong",
  }),
  harga_beli: z.number().refine((val) => val !== 0, {
    message: "Harga tidak boleh kosong",
  }),
});

const schemaDetailTransaksi = z.array(transaksiDetailSchema);

export async function createPenjualan(req: TransaksiHeaderType) {
  //   console.log("data-create", req);
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

  const kode_transaksi = "JPJ-" + getCurrentTime();
  const company = session?.user.company || "";
  const user = req.user || "";
  const desk = req.deskripsi;
  const dataDetail: TransaksiDetailType[] = await req.data.map((item) => ({
    kode_transaksi: kode_transaksi,
    kode_produk: item.kode_produk,
    qty: -item.qty,
    harga: item.harga_jual,
  }));
  const dataDetail1: TransaksiDetailDataType[] = await req.data.map((item) => ({
    kode_transaksi: kode_transaksi,
    kode_produk: item.kode_produk,
    qty: -item.qty,
    harga_jual: item.harga_jual,
    harga_beli: item.harga_beli,
  }));

  const validate = schame.safeParse({
    kode_transaksi: kode_transaksi,
    tgl_transaksi: tgl_transaksi,
    company: company,
    user: user,
    desk: desk,
  });
  const validateDetailTrans = schemaDetailTransaksi.safeParse(dataDetail1);
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
    const totalTransaksi = dataDetail.reduce((total, item) => {
      const temp = item.harga * item.qty;
      return total + temp;
    }, 0);

    let allDataTransaksiDetailJurnal: TypeTransaksiDetailJurnal[];
    const transactionCretePembelian = await prisma.$transaction(
      async (tx: any) => {
        const mapJurnal = await generateJurnal("2");
        let dataTransaksiDetailJurnal: TypeTransaksiDetailJurnal[];
        try {
          if (mapJurnal.status === "ok") {
            if (
              req.data !== undefined &&
              mapJurnal.status === "ok" &&
              Array.isArray(mapJurnal.message)
            ) {
              allDataTransaksiDetailJurnal = [];
              await Promise.all(
                (req.data || []).map(async (itemdata) => {
                  dataTransaksiDetailJurnal = await Promise.all(
                    mapJurnal.message.map((item: TypeMapingTransaksi) => {
                      let harga = 0;
                      if (
                        item.kode_akun === "1101" ||
                        item.kode_akun === "4001"
                      ) {
                        harga = itemdata.harga_jual * itemdata.qty;
                      } else {
                        harga = itemdata.harga_beli * itemdata.qty;
                      }
                      return {
                        kode_transaksi: kode_transaksi,
                        no_akun: item.kode_akun,
                        debet: item.posisi === "D" ? harga : 0,
                        kredit: item.posisi === "K" ? harga : 0,
                      };
                    })
                  );
                  if (dataTransaksiDetailJurnal) {
                    allDataTransaksiDetailJurnal.push(
                      ...dataTransaksiDetailJurnal
                    );
                    // Ensure this is an array
                  }
                })
              );
            }
            const createJurnalPembelian =
              await tx.tb_transaksi_detail_jurnal.createMany({
                data: allDataTransaksiDetailJurnal,
              });
            if (createJurnalPembelian.count !== 0) {
              const createDataPembelian = await tx.tb_transaksi_header.create({
                data: {
                  kode_transaksi: kode_transaksi,
                  company: company,
                  tgl_transaksi: tgl_transaksi,
                  jenis_transaksi: "2",
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
      }
    );

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

export async function validatePenjualan(kode_transaksi: string) {
  const session = await getServerSession(options);
  const company = session?.user.company;
  const prisma = new PrismaClient();
  console.log("kodetransaksi", kode_transaksi);
  try {
    const result = await prisma.$executeRawUnsafe(
      "update tb_transaksi_header set tb_transaksi_header.status_transaksi=? where tb_transaksi_header.kode_transaksi=?",
      "1",
      kode_transaksi
    );
    if (result) {
      return {
        status: "success",
        message: "Transaction status updated successfully.",
        data: result,
      };
    }
  } catch (error) {
    console.error("Update failed:", error);
    return {
      status: "error",
      message: "Failed to update transaction status.",
      error: error, // Provide the error message for debugging
    };
  }
}

export async function unvalidatePenjualan(kode_transaksi: string) {
  const session = await getServerSession(options);
  const company = session?.user.company;
  const prisma = new PrismaClient();
  console.log("kodetransaksi", kode_transaksi);
  try {
    const result = await prisma.$executeRawUnsafe(
      "update tb_transaksi_header set tb_transaksi_header.status_transaksi=? where tb_transaksi_header.kode_transaksi=?",
      "0",
      kode_transaksi
    );
    if (result) {
      return {
        status: "success",
        message: "Transaction status updated successfully.",
        data: result,
      };
    }
  } catch (error) {
    console.error("Update failed:", error);
    return {
      status: "error",
      message: "Failed to update transaction status.",
      error: error, // Provide the error message for debugging
    };
  }
}

export async function getDataCustomer(email: string) {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.tb_user_customer.findFirst({
      where: {
        email: email,
      },
    });
    console.log(data);
    if (data) {
      return {
        status: 200,
        data: data,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
}
