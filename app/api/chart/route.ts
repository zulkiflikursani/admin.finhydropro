import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST() {
  const prisma = new PrismaClient();
  try {
    const tahun = "2024";
    const data = await prisma.$queryRawUnsafe(
      `SELECT 
        MONTH(tgl_transaksi) AS Month,
        SUM(CASE WHEN tb_transaksi_header.jenis_transaksi = '1' THEN tb_transaksi_detail.qty * tb_transaksi_detail.harga ELSE 0 END) AS pembelian,
        SUM(CASE WHEN tb_transaksi_header.jenis_transaksi = '2' THEN -tb_transaksi_detail.qty * tb_transaksi_detail.harga ELSE 0 END) AS penjualan
        FROM 
        tb_transaksi_header 
        LEFT JOIN 
        tb_transaksi_detail 
        ON tb_transaksi_header.kode_transaksi = tb_transaksi_detail.kode_transaksi
        WHERE 
        YEAR(tb_transaksi_header.tgl_transaksi) = ?
        GROUP BY 
        MONTH(tb_transaksi_header.tgl_transaksi)`,
      tahun
    );

    return NextResponse.json({
      status: 200,
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error,
    });
  }
}
