"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Viaoda_Libre } from "next/font/google";
import { redirect } from "next/navigation";
import { z } from "zod";

const formScheme = z.object({
  kode_akun: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, { message: "Anda belum mengisi kode akun !" }),
  kode_header: z
    .string()
    .min(1, { message: "Anda belum mengisi kode Header !" }),
  company: z.string().min(1, { message: "Company tidak ditemukan !" }),
  nama_akun: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1, { message: "Anda belum mengisi nama akun !" }),
});

export async function updateAkunDetail(
  formState: {
    message: string;
  },
  formData: FormData
) {
  const session = await getServerSession(options);
  const company = session?.user.company;
  const validate = formScheme.safeParse({
    kode_akun: formData.get("kode_akun"),
    kode_header: formData.get("kode_header"),
    company: company,
    nama_akun: formData.get("nama_akun"),
  });
  if (validate.success) {
    const dataValid = validate.data;
    const prisma = new PrismaClient();
    const result = prisma.akundetail.updateMany({
      where: {
        company: dataValid.company,
        kode_akun: dataValid.kode_akun,
      },
      data: {
        nama_akun: dataValid.nama_akun,
        kode_akun_header: dataValid.kode_header,
      },
    });
    const hasil = await result;
    if (!hasil) {
      return {
        message: "Gagal menyimpan data",
      };
    } else {
      revalidatePath("/admin/akun");
      redirect("/admin/akun");
    }
  } else {
    return {
      message: "Data tidak lengkap !",
    };
  }
}
async function cekDuplikatAkunDetail(kodeakun: string, company: string) {
  const prisma = new PrismaClient();

  const findDuplicate = await prisma.akundetail.findFirst({
    select: {
      kode_akun: true,
    },
    where: {
      kode_akun: kodeakun,
      company: company,
    },
  });
  return findDuplicate;
}
export async function createAkunDetail(
  formState: { message: string },
  formData: FormData
) {
  const prisma = new PrismaClient();
  const session = await getServerSession(options);
  const company = session?.user.company;
  const validate = formScheme.safeParse({
    kode_akun: formData.get("kode_akun"),
    kode_header: formData.get("kode_header"),
    company: company,
    nama_akun: formData.get("nama_akun"),
  });
  if (validate.success) {
    const cekDuplikat = await cekDuplikatAkunDetail(
      validate.data.kode_akun,
      validate.data.company
    );

    console.log("status duplicate", cekDuplikat?.kode_akun);

    if (cekDuplikat?.kode_akun === undefined) {
      const result = await prisma.akundetail.create({
        data: {
          kode_akun: validate.data.kode_akun,
          kode_akun_header: validate.data.kode_header,
          company: validate.data.company,
          nama_akun: validate.data.nama_akun,
        },
      });
      if (result) {
        revalidatePath("/admin/akun");
        redirect("/admin/akun");
      } else {
        message: {
          ("Gagal melakukan update");
        }
      }
      return {
        message: "success",
      };
    } else {
      return {
        message: "duplicate",
      };
    }
  } else {
    console.log(validate.error.flatten().fieldErrors);
    return {
      message: validate.error.toString(),
    };
  }
}

export async function deleteAkunDetail(id: number) {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.akundetail.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/admin/akun");
    return {
      status: "ok",
      message: "berhasil melakukan delete data",
    };
  } catch (error) {
    return {
      status: "fail",
      message: "Terjadi masalah saat melakukan delete data",
    };
  }
}
