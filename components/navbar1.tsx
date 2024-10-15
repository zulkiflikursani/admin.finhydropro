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
    <NextUINavbar maxWidth="full" position="sticky" className="flex">
      {/* sidebar */}
      <div
        className={
          open
            ? ` md:w-0 fixed left-0 top-0 h-screen w-60 py-2 z-40 dark:bg-primary-400 bg-white dark:border-transparent border-1 drop-shadow-sm`
            : ` md:w-0 fixed left-0 top-0 h-screen w-0 py-2  z-40 dark:bg-primary-400 bg-white dark:border-transparent border-1 drop-shadow-sm`
        }
      >
        {/* <NavbarContent className=" sm:basis-full" justify="center">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">FindHydroPro</p>
            </NextLink>
            </NavbarBrand>
          </NavbarContent>*/}
        <div className="w-full text-center font-bold text-inherit bg-gray-200 py-3  dark:bg-gray-600">
          FindHydroPro
        </div>

        <div
          className={`flex-col mt-3 fixed left-0 top-0 h-screen w-0 py-2 z-40 dark:bg-primary-400 bg-white dark:border-transparent border-1 drop-shadow-sm ${
            open ? `md:w-60` : `md:w-0`
          }`}
        >
          <div className="rel  flex-col space-y-2">
            {/* <NavbarContent className="basis-1/5 sm:basis-full" justify="start"> */}

            {siteConfig.navItems.map((item) => (
              <div
                key={item.label}
                className="hover:bg-blue-400 rounded-sm px-2 font-semibold w-full"
              >
                <Link href={item.href} className="text-inherit ">
                  {item.label}
                </Link>
              </div>
            ))}
            <Button onClick={() => signOut()}>SignOut</Button>
            {/* </NavbarContent> */}
          </div>
        </div>
      </div>

      {/* topbar */}
      <NavbarContent
        className="basis-5/5  invisible md:visible md:w-full py-2 px-2 md:mx-[-23px] border-b-[1px]  shadow-md shadow-blue-200"
        justify="start"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit ">
          <div
            className={
              open
                ? `ml-60 bg-black p-2 rounded-lg w-0 md:w-8 flex-col space-y-1`
                : `bg-black p-2 rounded-lg w-0 md:w-8 flex-col space-y-1 `
            }
            onClick={() => setopen(!open)}
          >
            <div className="bg-white h-[2px] w-full"></div>
            <div className="bg-white h-[2px] w-full"></div>
            <div className="bg-white  h-[2px] w-full"></div>
          </div>
          <ThemeSwitch className="invisible md:visible" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      {/* navbar mobile */}
      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
