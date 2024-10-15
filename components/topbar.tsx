"use client";
import React, { useContext, useState } from "react";
import { ThemeSwitch } from "./theme-switch";
import { siteConfig } from "@/config/site";
import { SidebarItems } from "./sidebar";
import { useSession } from "next-auth/react";
interface Props {
  user?: string;
  level?: string;
}

const Topbar = (props: Props) => {
  const session = useSession();
  const [expand, setexpand] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`sticky top-0 z-30 min-h-16 backdrop-blur-sm `}>
      <div className="relative">
        <div className="flex items-center  h-20 p-2  text-foreground-500 md:justify-end justify-between shadow-lg">
          <div className="flex">
            <button
              onClick={toggleSidebar}
              className="md:hidden flex flex-col space-y-1 items-center justify-center w-8 h-8 bg-blue-500 rounded"
            >
              <div
                className={`bg-default w-full h-1 transition-transform duration-300 ${isOpen ? "transform rotate-45 translate-y-1.5" : ""}`}
              ></div>
              <div
                className={`bg-default w-full h-1 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></div>
              <div
                className={`bg-default w-full h-1 transition-transform duration-300 ${isOpen ? "transform -rotate-45 -translate-y-1.5" : ""}`}
              ></div>
            </button>
            <div className="flex"></div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <span className="mr-2  font-semibold">
              Hi, <span className="uppercase">{props.user}</span>
            </span>
          </div>
        </div>
        <div
          className={`md:hidden bg-gray-800 text-white w-64 h-screen p-4 fixed transform transition-transform duration-300 ease-in-out bg-blue
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <h2 className="text-xl font-bold">Menu</h2>
          {session.data?.user.level === "2" &&
            siteConfig.navItemsCompany.map((item, i) => (
              <SidebarItems
                key={i}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          {/* <ul className="mt-4">{children}</ul> */}
          {session.data?.user.level === "1" &&
            siteConfig.navItemsAdmin.map((item, i) => (
              <SidebarItems
                key={i}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          {/* <ul className="mt-4">{children}</ul> */}
        </div>
        {/* <div
          className={`absolute -left-3  z-50 bg-black  ${expand ? `scale-x-[-1]` : ""}  hover:bg-gray-600 rounded-full p-1 top-5 cursor-pointer`}
          onClick={() => setexpand(!expand)}
        >
          <MdArrowForwardIos className="text-white " />
        </div> */}
      </div>
    </div>
  );
};

export default Topbar;
