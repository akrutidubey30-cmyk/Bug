import { useDispatch } from "react-redux";
import { openAddModal } from "../redux/bugsSlice";

const DashboardHeader = () => {
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#dededb] bg-white/95 pr-4 pl-14 backdrop-blur sm:px-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#92928c]">
          Workspace / Product
        </p>
        <h1 className="mt-0.5 text-lg font-semibold tracking-tight">
          Bug overview
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden h-9 rounded-lg border border-[#dededb] px-3 text-sm text-[#6e6e69] sm:block">
          Last 30 days⌄
        </button>
        <button
          onClick={() => dispatch(openAddModal())}
          className="h-9 rounded-lg bg-[#1c1c1c] px-4 text-sm font-medium text-white hover:bg-black"
        >
          + Report bug
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
