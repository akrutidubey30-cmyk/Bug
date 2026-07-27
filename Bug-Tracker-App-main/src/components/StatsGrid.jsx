import { useSelector } from "react-redux";

const StatsGrid = () => {
  const bugs = useSelector((state) => state.bugs.bugs);
  const theme = useSelector((state) => state.bugs.theme);
  const open = bugs.filter((bug) => bug.status === "Open").length;
  const progress = bugs.filter((bug) => bug.status === "In Progress").length;
  const resolved = bugs.filter((bug) => bug.status === "Resolved").length;

  const stats = [
    { label: "Total issues", value: bugs.length, change: "+12.4%", color: theme === "dark" ? "#f4f4f1" : "#171717" },
    { label: "Open issues", value: open, change: "+4.8%", color: "#ff6b5e" },
    { label: "In progress", value: progress, change: "-2.1%", color: "#ecb83e" },
    { label: "Resolution rate", value: `${bugs.length ? Math.round((resolved / bugs.length) * 100) : 0}%`, change: "+8.2%", color: "#59a97a" },
  ];

  return (
    <section className="grid shrink-0 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`relative min-h-36 p-5 ${
            index !== stats.length - 1 ? "border-b border-[#dededb] xl:border-b-0 xl:border-r" : ""
          } ${index === 1 ? "sm:border-l xl:border-l-0" : ""}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a8a85]">
              {stat.label}
            </p>
            <span className="text-xs text-[#a1a19c]">ⓘ</span>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <p className="text-3xl font-medium tracking-tight">{stat.value}</p>
            <p className="text-xs font-medium" style={{ color: stat.color }}>
              {stat.change}
            </p>
          </div>

          <svg className="mt-4 h-7 w-full" viewBox="0 0 180 28" preserveAspectRatio="none">
            <path
              d="M0 24 C18 22, 22 7, 42 13 S72 23, 88 12 S115 3, 130 10 S158 24, 180 5"
              fill="none"
              stroke={stat.color}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      ))}
    </section>
  );
};

export default StatsGrid;
