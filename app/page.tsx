"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { text } from "stream/consumers";

export default function Home() {
  return (
    <>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4 ">
            <div
              className={`${``} flex h-20 p-2 justify-center items-center  gap-1 bg-red-400 `}
            >
              <span className={`font-black text-foreground-500 ${``}`}>FH</span>
              <h4
                className={`${``} text-foreground-800 font-bold tracking-tighter`}
              >
                FinHydroPro
              </h4>
            </div>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent>
          <NavbarItem>
            {/* <Link color="foreground" href="#">
              Dahsboard
            </Link> */}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent>
          <Input name="search" placeholder="Cari barang ..." />
        </NavbarContent>
      </Navbar>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-sectionOne bg-cover bg-repeat min-h-screen">
        <div className="inline-block max-w-lg text-center drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
          <h1 className={title({ color: "green" })}>Aplikasi&nbsp;</h1>
          <h1 className={title({ color: "whitegrey" })}>FinHydroPro&nbsp;</h1>
          <br />
          <h1 className="font-bold text-foreground-100 text-stroke-black tracking-tighter">
            Aplikasi Smart Farming 4.0 solusi digital yang membantu para
            wirausaha hidroponik di Kabupaten Pangkep mengelola keuangan mereka
            secara lebih cerdas dan efisien. Dengan antarmuka yang mudah
            digunakan, aplikasi ini dirancang untuk mencatat pemasukan,
            pengeluaran, dan keuntungan usaha, serta menyediakan laporan
            keuangan yang transparan dan real-time. Kami menyadari pentingnya
            pengelolaan keuangan yang baik dalam setiap usaha. Oleh karena itu,
            aplikasi ini membantu para petani membuat keputusan bisnis yang
            lebih baik dengan memanfaatkan analisis keuangan yang praktis dan
            komprehensif. Semua ini dirancang untuk meningkatkan kesejahteraan
            dan keberhasilan bisnis pertanian di Pangkep.
          </h1>
          {/* <h2 className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </h2> */}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => signIn()}
            className={buttonStyles({
              variant: "shadow",
              color: "success",
              class: "rounded-full",
            })}
          >
            Login
          </Button>
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              class: "rounded-full",
            })}
            href={"/admin"}
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="shadow">
            <span>
              Get started by <Code color="primary">FinHydroPro</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </>
  );
}
