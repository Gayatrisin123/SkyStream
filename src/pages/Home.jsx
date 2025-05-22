import Home1 from "../components/HomeSection/Home1";
import Home2 from "../components/HomeSection/Home2";
import Home3 from "../components/HomeSection/Home3";
import Home4 from "../components/HomeSection/Home4";
import { LampSeparator } from "../components/ui/LampSeparator";

export default function Home() {
  return (
    <div className="text-center justify-center">
      <Home1 />
      <div className="-mt-8 -mb-16">
        <LampSeparator />
      </div>
      <Home2 />
      <div className="min-h-screen">
        <div className="-mt-10">
          <LampSeparator />
        </div>
        <Home3 />
      </div>
      <div className="min-h-screen">
        <div className="-mt-10 -mb-3">
          <LampSeparator />
        </div>
        <Home4 />
      </div>
    </div>
  );
}
