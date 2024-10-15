import { PrismaClient } from "@prisma/client";
import React from "react";

export async function getDataChart() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}chart`, {
      method: "POST",
      credentials: "include",
      headers: {},
    });

    const res = await data.json();
    console.log(res);
    if (res.status === 200) {
      return {
        status: 200,
        data: res.data,
      };
    } else {
      return {
        status: 500,
        error: res.error,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
}
