import { PrismaClient } from "@prisma/client";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.akunheaders.findMany({
      select: {
        kode_akun_header: true,
        nama_akun_header: true,
      },
    });
    console.log(data);
    return NextResponse.json({ statusCode: 200, data: data });
  } catch (error) {
    return NextResponse.json({ statusCode: 500, error: error });
  }
}
