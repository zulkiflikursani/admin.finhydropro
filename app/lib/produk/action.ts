"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { RedirectType, redirect } from "next/navigation";

const formScheme = z.object({
  company: z.string().min(1, { message: "Perusahaan belum ditentukan" }),
  kode_produk: z.string().min(1, { message: "Kode Produk tidak boleh kosong" }),
  nama_produk: z.string().min(1, { message: "Nama Produk tidak boleh kosong" }),
  deskripsi: z.string().min(1, { message: "Deskripsi tidak boleh kosong" }),
  harga_beli: z
    .number({
      required_error: "Harga beli is required",
      invalid_type_error: "Harga beli must be a number",
    })
    .nonnegative(),
  harga_jual: z
    .number({
      required_error: "Harga jual is required",
      invalid_type_error: "Harga jual must be a number",
    })
    .nonnegative(),
});

export async function createProduk(
  formSate: { message: string },
  formData: FormData
) {
  const session = await getServerSession(options);
  const company = session?.user.company;
  const harga_beli = Number(formData.get("harga_beli_produk"));
  const harga_jual = Number(formData.get("harga_jual_produk"));
  const validate = formScheme.safeParse({
    company: company,
    kode_produk: formData.get("kode_produk"),
    nama_produk: formData.get("nama_produk"),
    deskripsi: formData.get("deskripsi"),
    harga_jual: harga_jual,
    harga_beli: harga_beli,
  });

  const prisma = new PrismaClient();
  if (validate.success) {
    const cekDuplikatData = await cekDuplikat(validate.data.kode_produk);
    if (cekDuplikatData?.kode_produk === undefined) {
      const createProduk = await prisma.tb_produk.create({
        data: {
          company: validate.data.company,
          kode_produk: validate.data.kode_produk,
          nama_produk: validate.data.nama_produk,
          deskripsi: validate.data.deskripsi,
          harga_beli: validate.data.harga_beli,
          harga_jual: validate.data.harga_jual,
        },
      });
      if (createProduk) {
        revalidatePath("/admin/produk");
        redirect("/admin/produk");
      } else {
        return {
          message: "Gagal menyimpan data",
        };
      }
    } else {
      return {
        message:
          "No akun sudah digunakan silahkan gunakan nomor akun yang lain",
      };
    }
  } else {
    return {
      message: "Data yang dimasukkan tidak lengkap atau tidak sesuai",
    };
  }
}

async function cekDuplikat(kode_produk: string) {
  const session = await getServerSession(options);
  const prisma = new PrismaClient();
  const cariDuplikat = await prisma.tb_produk.findFirst({
    where: {
      kode_produk: kode_produk,
      company: session?.user.company || "",
    },
  });
  return cariDuplikat;
}
export async function updateProduk(
  formSate: { message: string },
  formData: FormData
) {
  const session = await getServerSession(options);
  const company = session?.user.company;
  const harga_beli = Number(formData.get("harga_beli_produk"));
  const harga_jual = Number(formData.get("harga_jual_produk"));
  const validate = formScheme.safeParse({
    company: company,
    kode_produk: formData.get("kode_produk"),
    nama_produk: formData.get("nama_produk"),
    deskripsi: formData.get("deskripsi"),
    harga_jual: harga_jual,
    harga_beli: harga_beli,
  });

  const prisma = new PrismaClient();
  if (validate.success) {
    const createProduk = await prisma.tb_produk.updateMany({
      where: {
        company: validate.data.company,
        kode_produk: validate.data.kode_produk,
      },
      data: {
        nama_produk: validate.data.nama_produk,
        deskripsi: validate.data.deskripsi,
        harga_beli: validate.data.harga_beli,
        harga_jual: validate.data.harga_jual,
      },
    });
    if (createProduk) {
      revalidatePath("/admin/produk");
      redirect("/admin/produk");
    } else {
      return {
        message: "Gagal menyimpan data",
      };
    }
  } else {
    return {
      message: "Data yang dimasukkan tidak lengkap atau tidak sesuai",
    };
  }
  return {
    message: "",
  };
}

export async function deleteProdukById(id: number) {
  const prisma = new PrismaClient();
  try {
    const deleteProduk = await prisma.tb_produk.delete({
      where: {
        id: id,
      },
    });
    if (deleteProduk) {
      revalidatePath("/admin/produk");
      return {
        status: "ok",
        message: "Data Berhasil Dihapus",
      };
    }
  } catch (error) {
    return {
      status: "fail",
      message: "Terjadi masalah pada saat melakukan delete data",
    };
  }
}
