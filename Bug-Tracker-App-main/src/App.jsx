import StatsGrid from "./components/StatsGrid";
import BugChart from "./components/BugChart";
import BugTable from "./components/BugTable";
import ActivityPanel from "./components/ActivityPanel";
import MobileDashboard from "./components/MobileDashboard";

const App = () => {
  return (
    <>
      <MobileDashboard />

      <div className="hidden h-full flex-col overflow-hidden rounded-xl border border-[#dededb] bg-white md:flex">
        <StatsGrid />

        <div className="grid min-h-0 flex-1 overflow-hidden border-t border-[#dededb] xl:grid-cols-[1.65fr_0.75fr]">
          <div className="flex min-h-0 flex-col xl:border-r xl:border-[#dededb]">
            <BugChart />
            <BugTable />
          </div>

          <ActivityPanel />
        </div>
      </div>
    </>
  );
};

export default App;
