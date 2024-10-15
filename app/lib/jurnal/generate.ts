import { PrismaClient } from "@prisma/client";
import React from "react";

export async function generateJurnal(
  jenis_transaksi: string
): Promise<{ status: string; message?: any; error?: string }> {
  const prisma = new PrismaClient();
  try {
    const mapping = await prisma.mapping_transaksi.findMany({
      select: {
        kode_akun: true,
        posisi: true,
      },
      where: {
        jenis_transaksi: jenis_transaksi,
      },
    });

    return {
      status: "ok",
      message: mapping,
    };
  } catch (error) {
    return {
      status: "fail",
      error: (error as Error).message || "An error occurred",
    };
  }
}
