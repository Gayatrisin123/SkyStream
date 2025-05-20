import Home1 from "../components/HomeSection/Home1";
import Home2 from "../components/HomeSection/Home2";
import { LampSeparator } from "../components/ui/LampSeparator";

export default function Home() {
  return (
    <div className="text-center justify-center">
      <Home1 />
      <div className="-mt-8 -mb-16">
        <LampSeparator/>
      </div>
      <Home2 />
    </div>
  );
}
