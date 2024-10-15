-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `no_telpon` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `akunheaders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_akun_header` VARCHAR(191) NOT NULL,
    `nama_akun_header` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `akunheaders_kode_akun_header_key`(`kode_akun_header`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_company` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `company_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `akundetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `kode_akun_header` VARCHAR(191) NOT NULL,
    `kode_akun` VARCHAR(191) NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_saldo_awal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `kode_akun` VARCHAR(191) NOT NULL,
    `bulan` VARCHAR(191) NOT NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `saldo` INTEGER NOT NULL,

    UNIQUE INDEX `tb_saldo_awal_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `kode_produk` VARCHAR(191) NOT NULL,
    `nama_produk` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `harga_beli` INTEGER NOT NULL,
    `harga_jual` INTEGER NOT NULL,

    UNIQUE INDEX `tb_produk_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_saldo_awal_produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `kode_produk` VARCHAR(191) NOT NULL,
    `bulan` VARCHAR(191) NOT NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL,

    UNIQUE INDEX `tb_saldo_awal_produk_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_transaksi_header` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `kode_transaksi` VARCHAR(191) NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `jenis_transaksi` VARCHAR(191) NOT NULL,
    `deksripsi` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `status_transaksi` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_transaksi_header_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_transaksi_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_transaksi` VARCHAR(191) NOT NULL,
    `kode_produk` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL,
    `harga` INTEGER NOT NULL,

    UNIQUE INDEX `tb_transaksi_detail_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_transaksi_detail_jurnal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_transaksi` VARCHAR(191) NOT NULL,
    `no_akun` VARCHAR(191) NOT NULL,
    `debet` INTEGER NOT NULL DEFAULT 0,
    `kredit` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `tb_transaksi_detail_jurnal_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_user_customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `no_telpon` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT '0',
    `customer_company` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_user_customer_id_key`(`id`),
    UNIQUE INDEX `tb_user_customer_email_key`(`email`),
    UNIQUE INDEX `tb_user_customer_no_telpon_key`(`no_telpon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_keranjang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_customer` VARCHAR(191) NOT NULL,
    `kode_produk` VARCHAR(191) NOT NULL,
    `qty` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_keranjang_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapping_transaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_transaksi` VARCHAR(191) NOT NULL,
    `kode_akun` VARCHAR(191) NOT NULL,
    `posisi` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `mapping_transaksi_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
