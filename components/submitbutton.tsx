"use client";
import { Button } from "@nextui-org/button";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  label: string;
}
function Submitbutton(props: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="bg-primary-600 text-foreground-50 uppercase"
      disabled={pending}
    >
      {props.label}
    </Button>
  );
}

export default Submitbutton;
