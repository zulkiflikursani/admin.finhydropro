import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function fetchDataProduk() {
  const session = await getServerSession(options);
  const prisma = new PrismaClient();
  const company = session?.user.company as string;

  try {
    const produks = await prisma.tb_produk.findMany({
      where: {
        company: company,
      },
    });
    return {
      status: "ok",
      message: produks,
    };
  } catch (error) {
    return {
      status: "fail",
      error: error,
    };
  }
}

export async function fetchCustomer() {
  const session = await getServerSession(options);
  const prisma = new PrismaClient();
  const company = session?.user.company as string;
  try {
    const customer = await prisma.tb_user_customer.findMany({
      select: {
        id: true,
        nama: true,
        email: true,
        customer_company: true,
        no_telpon: true,
        alamat: true,
        status: true,
      },
    });
    return {
      status: "ok",
      message: customer,
    };
  } catch (error) {
    return {
      status: "fail",
      error: error,
    };
  }
}
export async function getProdukDetail(
  id: number
): Promise<{ statusCode: number; data: ProdukType }> {
  const session = await getServerSession(options);
  const prisma = new PrismaClient();
  const company = session?.user.company || "";

  const getData = await prisma.tb_produk.findFirst({
    where: {
      company: company,
      id: id,
    },
  });
  const result = {
    id: getData?.id || 0,
    company: getData?.company || "",
    kode_produk: getData?.kode_produk || "",
    nama_produk: getData?.nama_produk || "",
    deskripsi: getData?.deskripsi || "",
    harga_jual: getData?.harga_beli || 0,
    harga_beli: getData?.harga_beli || 0,
  };
  return {
    statusCode: 200,
    data: result,
  };
}
