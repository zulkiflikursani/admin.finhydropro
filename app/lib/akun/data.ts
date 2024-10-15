import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";

export async function fetchDataAkun(
  query: string,
  currentPage: number
): Promise<{
  statusCode: number;
  data?: AkunType[];
  totalPage?: number;
  error?: string;
}> {
  unstable_noStore;
  const session = await getServerSession(options);
  
  try {
    const fetchdata = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/akun/${session?.user.company}/${currentPage}?query=${query}`,
      {
        method: "GET",
        credentials: "include",
        headers: {},
      }
    );
    const res = await fetchdata.json();
    if (res.statusCode === 200) {
      return { statusCode: 200, data: res.data, totalPage: res.jumlahPage };
    } else {
      return { statusCode: 500, error: `Error data` };
    }
  } catch (error) {
    return { statusCode: 500, error: `Error data` };
  }
}

export async function fetchAkunDetail(kodeAkun: string): Promise<{
  statusCode: number;
  data?: AkunDetailType;
  error?: string;
}> {
  unstable_noStore;
  const session = await getServerSession(options);
  const company = session?.user.company;
  try {
    const getakundetail = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/akun/akundetail/${company}/${kodeAkun}`
    );
    const res = await getakundetail.json();
    return {
      statusCode: 200,
      data: res.data[0],
    };
  } catch (error) {
    return { statusCode: 200, error: "Error to featch data" };
  }
}

export async function fetchAkunHeader(): Promise<{
  statusCode: number;
  data: AkunHeaderType[];
}> {
  unstable_noStore;
  const prisma = new PrismaClient();
  const getakunheader = await prisma.akunheaders.findMany({
    select: {
      kode_akun_header: true,
      nama_akun_header: true,
    },
  });

  const data = getakunheader;
  return { statusCode: 200, data: data };
}
