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
    <section className="flex flex-col gap-4 px-2 py-2 item-center justify-center ">
      {/* <h1></h1> */}
      <Charts data={data} />
    </section>
  );
}
