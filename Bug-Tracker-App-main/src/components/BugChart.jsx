import { useSelector } from "react-redux";

const BugChart = () => {
  const bugs = useSelector((state) => state.bugs.bugs);
  const theme = useSelector((state) => state.bugs.theme);
  const resolved = bugs.filter((bug) => bug.status === "Resolved").length;

  return (
    <section className="hidden shrink-0 border-b border-[#dededb] p-5 lg:block">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a8a85]">
            Issue activity
          </p>
          <p className="mt-2 text-2xl font-medium">{bugs.length} tracked</p>
        </div>
        <div className="flex gap-4 text-xs text-[#777772]">
          <span><b className="mr-1 text-[#1d1d1d]">●</b> Reported</span>
          <span><b className="mr-1 text-[#9bc53d]">●</b> Resolved</span>
        </div>
      </div>

      <div className="relative mt-5 h-36 overflow-hidden 2xl:h-52">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[1, 2, 3, 4, 5].map((line) => (
            <div key={line} className="border-t border-dashed border-[#e6e6e2]" />
          ))}
        </div>

        <svg className="relative h-full w-full" viewBox="0 0 800 210" preserveAspectRatio="none">
          <path
            d="M0 176 C70 165, 105 78, 170 102 S270 164, 335 110 S440 45, 505 74 S610 146, 680 88 S740 65, 800 28"
            fill="none"
            stroke={theme === "dark" ? "#f4f4f1" : "#202020"}
            strokeWidth="2.2"
          />
          <path
            d="M0 194 C90 187, 120 155, 190 170 S300 180, 365 150 S465 127, 525 135 S635 152, 700 118 S760 104, 800 83"
            fill="none"
            stroke="#9bc53d"
            strokeWidth="2.2"
          />
        </svg>
      </div>

      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-[#a1a19c]">
        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
        <span>{resolved} resolved</span>
      </div>
    </section>
  );
};

export default BugChart;
