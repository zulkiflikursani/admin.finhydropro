"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  const [open, setopen] = useState(false);
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="flex p-0 m-0">
      <div className="flex w-full space-x-2">
        <div className="w-10 h-screen bg-blue-500 hover:w-60"></div>
        <div className="flex w-full flex-col gap-2">
          <NextUINavbar
            maxWidth="full"
            position="sticky"
            className="flex bg-red-500"
          ></NextUINavbar>
          <div className="w-full bg-pink-500 flex-1 p-2">tes</div>
          <div className="w-full bg-pink-500">footer</div>
        </div>
      </div>
    </div>
  );
};
