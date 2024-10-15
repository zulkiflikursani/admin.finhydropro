import React from "react";

import Akun from "@/components/akun/akun";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: number;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;

  return (
    <div className="flex flex-col rounded-lg  justify-center p-5">
      <Akun currentPage={currentPage} query={query} />
    </div>
  );
};

export default page;
