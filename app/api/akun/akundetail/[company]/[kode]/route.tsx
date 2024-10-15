import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { company: string; kode: string } }
) {
  const kode_akun = params.kode;
  const company = params.company;
  const prisma = new PrismaClient();
  try {
    const data = await prisma.$queryRawUnsafe(
      `select akundetail.id,akunheaders.kode_akun_header, akunheaders.nama_akun_header,akundetail.kode_akun,akundetail.nama_akun from akundetail left join akunheaders on akundetail.kode_akun_header = akunheaders.kode_akun_header where akundetail.company = ? and akundetail.kode_akun = ?`,
      company,
      kode_akun
    );
    console.log("dataapi : ", data);
    return NextResponse.json({ statusCode: 200, data: data });
  } catch (error) {
    console.error("Error executing raw SQL query:", error);
    return NextResponse.json({ statusCode: 500, error: error });
  }
}
