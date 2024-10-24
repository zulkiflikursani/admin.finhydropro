"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  produk: ProdukType[] | undefined;
  dataPembelian: DetailPembelianType[];
  handleData: (e: string, i: number) => void;
  handleChangeQty: (e: number, i: number) => void;
  handleChangeHbeli: (e: number, i: number) => void;
  handleDeleteItem: (i: string) => void;
}

function TableInputPembelian(props: Props) {
  // console.log(props.dataPembelian);
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th className="w-24">Qty</th>
            <th>Harga beli</th>
            <th>Jumlah</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.dataPembelian.map((row, i) => (
            <tr key={i}>
              <td>
                <Autocomplete
                  isRequired
                  className="bg-foreground-50 rounded-xl"
                  defaultItems={props.produk}
                  labelPlacement="inside"
                  inputValue={
                    row.nama_produk !== undefined
                      ? row?.nama_produk.toString()
                      : "0"
                  }
                  name={"kode_produk"}
                  placeholder="Pilih Produk"
                  size="sm"
                  variant="bordered"
                  onInputChange={(e) => props.handleData(e, i)}
                  onChange={(e) => props.handleData(e.target.value, i)}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.id}
                      textValue={item.nama_produk}
                    >
                      <div className="flex space-x-1">
                        <span>{item.kode_produk}</span> <span>:</span>
                        <span>{item.nama_produk}</span>
                      </div>
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </td>
              <td>
                <Input
                  defaultValue={
                    row.qty !== undefined ? row.qty.toString() : "0"
                  }
                  name="qty"
                  size="sm"
                  type="number"
                  value={row.qty !== undefined ? row?.qty.toString() : "0"}
                  onChange={(e) =>
                    props.handleChangeQty(Number(e.target.value), i)
                  }
                />
              </td>
              <td>
                <Input
                  name="harga_beli"
                  size="sm"
                  type="number"
                  value={
                    row.harga_beli !== undefined
                      ? row?.harga_beli.toString()
                      : "0"
                  }
                  onChange={(e) =>
                    props.handleChangeHbeli(Number(e.target.value), i)
                  }
                />
              </td>
              <td>
                <Input
                  name="total_harga"
                  size="sm"
                  type="number"
                  value={(row.harga_beli * row.qty).toString()}
                />
              </td>
              <td>
                <FaTrashAlt
                  className="h-7 w-7 p-1 bg-white dark:text-black rounded-lg cursor-pointer hover:text-foreground-50 hover:bg-primary-500"
                  onClick={(e) => props.handleDeleteItem(row.kode_produk)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableInputPembelian;
