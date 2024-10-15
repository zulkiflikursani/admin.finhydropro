"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import React, { useState } from "react";

interface Props {
  label: string;
  name: string;
  data: AkunHeaderType[];
  value?: string;
  onChange?: (value: string) => void;
}
function CustomAutoComplete(props: Props) {
  const setValue = (value: string): void => {
    console.log(value);
  };
  const data = props.data;
  return (
    <>
      <Autocomplete
        defaultItems={data}
        label={props.label}
        placeholder="Select a user"
        labelPlacement="inside"
        onInputChange={props.onChange}
        variant="bordered"
        className="bg-foreground-50 rounded-xl"
        name={props.name}
        size="sm"
        defaultInputValue={props.value}
        isRequired
      >
        {(item) => (
          <AutocompleteItem
            key={item.kode_akun_header}
            textValue={item.kode_akun_header}
          >
            <div className="flex space-x-1">
              <span>{item.kode_akun_header}</span> <span>:</span>
              <span>{item.nama_akun_header}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
}

export default CustomAutoComplete;
