/*
  Warnings:

  - A unique constraint covering the columns `[kode_transaksi]` on the table `tb_transaksi_header` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tb_transaksi_header_kode_transaksi_key` ON `tb_transaksi_header`(`kode_transaksi`);
