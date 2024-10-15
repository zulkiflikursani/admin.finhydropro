"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", Penjualan: 0, Produksi: 0 },
  { month: "February", Penjualan: 0, Produksi: 0 },
  { month: "March", Penjualan: 0, Produksi: 0 },
  { month: "April", Penjualan: 0, Produksi: 0 },
  { month: "May", Penjualan: 0, Produksi: 0 },
  { month: "June", Penjualan: 0, Produksi: 0 },
  { month: "July", Penjualan: 0, Produksi: 0 },
  { month: "Agust", Penjualan: 0, Produksi: 0 },
  { month: "Sept", Penjualan: 0, Produksi: 0 },
  { month: "Okt", Penjualan: 0, Produksi: 0 },
  { month: "Nov", Penjualan: 0, Produksi: 0 },
  { month: "Des", Penjualan: 0, Produksi: 0 },
];

const chartConfig = {
  desktop: {
    label: "Penjualan",
    color: "#2563eb",
  },
  mobile: {
    label: "Produksi",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface Props {
  data: any;
}
export function Charts(props: Props) {
  console.log(props.data);

  const bulan = [
    "jan",
    "feb",
    "maret",
    "april",
    "mei",
    "jun",
    "juli",
    "agust",
    "sept",
    "okt",
    "nov",
    "des",
  ];
  if (props.data.data && Array.isArray(props.data.data)) {
    props.data.data.map((item: any) => {
      const monthIndex = item.Month - 1; // Adjust for zero-based index
      chartData[monthIndex].Produksi = parseInt(item.pembelian, 10) || 0;
      chartData[monthIndex].Penjualan = parseInt(item.penjualan, 10) || 0;
    });
    console.log("chartdata", chartData);
  }

  return (
    <div className="flex container justify-center items-center ">
      <div className="flex flex-col items-center">
        <h1 className="font-bold">Trend Produksi Dan Penjualan</h1>
        <ChartContainer
          config={chartConfig}
          className="md:min-h-[300px] md:min-w-[full] min-h-[200px]"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="Produksi" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="Penjualan" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
