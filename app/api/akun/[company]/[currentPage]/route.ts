import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "v8";

export async function GET(
  req: NextRequest,
  { params }: { params: { company: string; currentPage: number } }
) {
  const getParams = req.nextUrl.searchParams;
  const serchParam = getParams.get("query");
  const prisma = new PrismaClient();
  // try {
  const LIMIT_PER_PAGE = 15;
  const offset = (params.currentPage - 1) * LIMIT_PER_PAGE;
  const querySelectData = `select akundetail.id,akunheaders.kode_akun_header, akunheaders.nama_akun_header,akundetail.kode_akun,akundetail.nama_akun from akundetail left join akunheaders on akundetail.kode_akun_header = akunheaders.kode_akun_header where akundetail.company = ? and (
      akundetail.nama_akun like CONCAT('%',?,'%') 
      or akunheaders.kode_akun_header like CONCAT('%',?,'%') 
      or akunheaders.nama_akun_header like CONCAT('%',?,'%') 
      or akundetail.kode_akun like CONCAT('%',?,'%') 
      or akundetail.nama_akun like CONCAT('%',?,'%') 
    )
    ORDER BY akundetail.kode_akun ASC 
    LIMIT  ${LIMIT_PER_PAGE} offset ${offset}`;
  const data = await prisma.$queryRawUnsafe(
    querySelectData,
    params.company,
    serchParam,
    serchParam,
    serchParam,
    serchParam,
    serchParam
  );

  const queryCountData = `select COUNT(*) AS count from akundetail left join akunheaders on akundetail.kode_akun_header = akunheaders.kode_akun_header where akundetail.company = ? and (
      akundetail.nama_akun like CONCAT('%',?,'%') 
      or akunheaders.kode_akun_header like CONCAT('%',?,'%') 
      or akunheaders.nama_akun_header like CONCAT('%',?,'%') 
      or akundetail.kode_akun like CONCAT('%',?,'%') 
      or akundetail.nama_akun like CONCAT('%',?,'%') 
    ) 
    ORDER BY akundetail.kode_akun ASC`;

  const jumlahdata = (await prisma.$queryRawUnsafe(
    queryCountData,
    params.company,
    serchParam,
    serchParam,
    serchParam,
    serchParam,
    serchParam
  )) as Array<{ count: bigint }> | any;
  const countdata = Number(jumlahdata[0].count);

  console.log("Data:", data);
  console.log("Jumlahdata:", jumlahdata);
  const totalPage = Math.ceil(countdata / LIMIT_PER_PAGE);
  return NextResponse.json({
    statusCode: 200,
    data: data,
    jumlahPage: totalPage,
  });

  // } catch (error) {
  //   console.error(error)
  //   return NextResponse.json({
  //     statusCode: 500,
  //     data: error,
  //   });
  // }
}
