import React from "react";

const PageHeader = ({ title }: { title: String }) => {
  return (
    <div className="bg-foreground-50   p-2 flex-col  w-full font-bold  px-2 border-1 border-foreground-200 uppercase text-foreground-500">
      {title}
    </div>
  );
};

export default PageHeader;
