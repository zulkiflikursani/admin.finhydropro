import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { kode: string } }
) {
  const prisma = new PrismaClient();
  const kodeHeader = params.kode;
  try {
    const data = await prisma.akunheaders.findMany({
      select: {
        kode_akun_header: true,
        nama_akun_header: true,
      },
      where: {
        kode_akun_header: kodeHeader,
      },
    });
    console.log(data);
    return NextResponse.json({ statusCode: 200, data: data });
  } catch (error) {
    return NextResponse.json({ statusCode: 500, error: error });
  }
}
