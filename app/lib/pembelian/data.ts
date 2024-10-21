import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
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
  nama_produk: string;
  qty: number;
  harga_jual: number;
  harga_beli: number;
}
export async function FetchDataDetailTransaksi(
  kode_transaksi: string
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
    const querySelectData = `SELECT
        *
        FROM
        tb_transaksi_header
        LEFT JOIN tb_transaksi_detail ON tb_transaksi_header.kode_transaksi = tb_transaksi_detail.kode_transaksi
        LEFT JOIN tb_produk ON tb_transaksi_detail.kode_produk = tb_produk.kode_produk and tb_transaksi_header.company = tb_produk.company
        WHERE
         tb_transaksi_header.kode_transaksi = ?
        and tb_transaksi_header.company= ?
        `;
    const dataPromise = await prisma.$queryRawUnsafe<TypeDetailTransaksi[]>(
      querySelectData,
      kode_transaksi,
      company
    );

    try {
      const [data] = await Promise.all([dataPromise]);
      console.log(data);
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
