import { title } from "@/components/primitives";
import { text } from "stream/consumers";

export default function AboutPage() {
  return (
    <div>
      <h1 className={`${title()} `}>Monitoring</h1>
      <br />
      <h1 className={`${title()} `}>IoT HydroPro</h1>

      <div className="content">
        <ul>
          <li>Kadar ph </li>
          <li>Konduktivitas (mS/cm)</li>
          <li>Suhu (°C)</li>
        </ul>{" "}
      </div>
    </div>
  );
}
