"use client";
import { Input } from "@nextui-org/input";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: session } = useSession();
  //   console.log(session?.user.company);
  const company = session?.user.company;
  const { replace } = useRouter();

  const handleChage = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    console.log(params);
    // console.log(pathname);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Input
        className="rounded-none"
        defaultValue={searchParams.get("query")?.toString()}
        placeholder={placeholder}
        onChange={(e) => handleChage(e.target.value)}
      />
    </>
  );
};

export default Search;
