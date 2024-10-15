import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt, { hash } from "bcrypt";
import { user } from "@nextui-org/theme";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  // const datareq = await req.json();

  try {
    const { email, password } = await req.json();
    const users = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        nama: true,
        level: true,
        company: true,
        password: true,
      },
    });
    if (!users) {
      return NextResponse.json(null);
    }
    const verifiuser = await bcrypt.compare(password, users.password);
    if (verifiuser) {
      console.log(users);
      return NextResponse.json({
        status: 200,
        message: users,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "Password atau email salah",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  }
}
