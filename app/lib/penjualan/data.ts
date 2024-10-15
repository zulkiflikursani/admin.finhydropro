import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { Search } from "lucide-react";
import { getServerSession } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";
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
export async function FetchDataPenjualan(
  query: string,
  mulai: string,
  sampai: string
) {
  const session = await getServerSession(options);
  const company = session?.user.company || "";
  const prisma = new PrismaClient();
  noStore;
  try {
    const datapenjualan = await prisma.tb_transaksi_header.findMany({
      where: {
        company: company,
        jenis_transaksi: "2",
        tgl_transaksi: {
          gte: mulai,
          lte: sampai,
        },
      },
    });
    return {
      statusCode: 200,
      data: datapenjualan,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error as string,
    };
  }
  //   console.log("data penjulan :", session);
}

export async function FetchDataDetailTransaksi(
  search: string,
  mulai: string,
  sampai: string
): Promise<{
  statusCode: number;
  data?: TypeDetailTransaksi[] | undefined;
  error?: string;
}> {
  const session = await getServerSession(options);
  const company = session?.user.company || "";
  const prisma = new PrismaClient();
  noStore;
  try {
    // try {

    const querySelectData = `SELECT
      *
      FROM
      tb_transaksi_header
      LEFT JOIN tb_transaksi_detail ON tb_transaksi_header.kode_transaksi = tb_transaksi_detail.kode_transaksi
      WHERE
      tb_transaksi_header.tgl_transaksi >= ?  
      and tb_transaksi_header.tgl_transaksi <= ? 
      and tb_transaksi_header.company= ?
      and tb_transaksi_header.kode_transaksi like CONCAT('%',?,'%') 
      `;
    const dataPromise = await prisma.$queryRawUnsafe<TypeDetailTransaksi[]>(
      querySelectData,
      mulai,
      sampai,
      company,
      search
    );

    console.log(company);

    try {
      const [data] = await Promise.all([dataPromise]);
      if (!data) {
        throw new Error("No data found or count data is missing.");
      }
      return {
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      console.error("Error fetching data:", error); // Log error for debugging
      return {
        statusCode: 500,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    } finally {
      await prisma.$disconnect(); // Ensure Prisma client is disconnected
    }
  } catch (error) {
    return {
      statusCode: 500,
      error: error as string,
    };
  }
}
