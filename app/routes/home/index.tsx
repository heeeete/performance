import Chart from "./components/Chart";
import PopularPerf from "./components/PopularPerf";

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto space-y-4">
            <PopularPerf />
            <Chart />
        </div>
    );
}
