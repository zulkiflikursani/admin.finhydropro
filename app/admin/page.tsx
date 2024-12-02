import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Charts } from "@/components/charts/Charts";
import { getDataChart } from "../lib/chart/data";
import bcrypt, { hash, hashSync } from "bcrypt";
export default async function Admin() {
  const data = await getDataChart();

  // const data2 = await hash("777888", 10);
  // console.log(data2);
  return (
    <section className="">
      {/* <h1></h1> */}
      <div className="flex p-2 gap-4">
        <div className="w-1/2">
          <Charts data={data} title={"Tren Produksi"} isi_chart={"P"} />
        </div>
        <div className="w-1/2">
          <Charts data={data} title={"Tren Penjualan"} isi_chart={"J"} />
        </div>
      </div>
      <div>
        <div className="w-1/2">
          <Charts
            data={data}
            title={"Tren Produksi dan Penjualan"}
            isi_chart={"PJ"}
          />
        </div>
      </div>
    </section>
  );
}
