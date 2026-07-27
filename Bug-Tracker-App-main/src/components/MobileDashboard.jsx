import {
  Bug,
  CheckCircle2,
  CircleDot,
  Clock3,
  MoveUpRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const MobileDashboard = () => {
  const bugs = useSelector((state) => state.bugs.bugs);
  const openBugs = bugs.filter((bug) => bug.status === "Open").length;
  const inProgressBugs = bugs.filter(
    (bug) => bug.status === "In Progress"
  ).length;
  const resolvedBugs = bugs.filter(
    (bug) => bug.status === "Resolved"
  ).length;
  const resolutionRate = bugs.length
    ? Math.round((resolvedBugs / bugs.length) * 100)
    : 0;

  const summaryItems = [
    {
      label: "Total",
      value: bugs.length,
      icon: <Bug className="size-4" />,
      iconStyle: "bg-violet-500/15 text-violet-500",
    },
    {
      label: "Open",
      value: openBugs,
      icon: <CircleDot className="size-4" />,
      iconStyle: "bg-rose-500/15 text-rose-500",
    },
    {
      label: "Progress",
      value: inProgressBugs,
      icon: <Clock3 className="size-4" />,
      iconStyle: "bg-amber-500/15 text-amber-500",
    },
    {
      label: "Resolved",
      value: resolvedBugs,
      icon: <CheckCircle2 className="size-4" />,
      iconStyle: "bg-emerald-500/15 text-emerald-500",
    },
  ];

  return (
    <section className="flex h-full flex-col gap-4 overflow-hidden pb-1 md:hidden">
      <div className="shrink-0">
        <div className="mb-4 flex items-end justify-between px-1">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#92928c]">
              Overview
            </p>
            <h2 className="mt-1 text-xl font-semibold">Today&apos;s bugs</h2>
          </div>
          <div className="rounded-full border border-[#dededb] bg-white px-3 py-1.5 text-xs font-medium shadow-sm">
            {resolutionRate}% resolved
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="min-h-32 rounded-2xl border border-[#dededb] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between">
                <span className={`grid size-8 place-items-center rounded-lg ${item.iconStyle}`}>
                  {item.icon}
                </span>
                <MoveUpRight className="size-3.5 text-[#aaa9a3]" />
              </div>
              <p className="mt-5 text-2xl font-semibold">{item.value}</p>
              <p className="mt-1 text-xs text-[#858580]">{item.label} bugs</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#dededb] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <div className="flex shrink-0 items-center justify-between border-b border-[#dededb] px-4 py-4">
          <div>
            <h3 className="text-sm font-semibold">Recent bugs</h3>
            <p className="mt-0.5 text-[11px] text-[#92928c]">
              Your latest reported issues
            </p>
          </div>
          <Link
            to="/bugs"
            className="rounded-lg bg-[#f1f1ee] px-3 py-1.5 text-xs font-medium"
          >
            View all
          </Link>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {bugs.length === 0 ? (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <span className="mx-auto grid size-11 place-items-center rounded-full bg-[#f1f1ee]">
                  <Bug className="size-5 text-[#858580]" />
                </span>
                <p className="mt-3 text-sm font-medium">No bugs found</p>
                <p className="mt-1 text-xs text-[#92928c]">
                  Report a bug to see it here.
                </p>
              </div>
            </div>
          ) : (
            bugs
              .slice()
              .reverse()
              .map((bug) => (
                <Link
                  key={bug.id}
                  to={`/bugs/${bug.id}`}
                  className="mx-2 flex items-start gap-3 border-b border-[#ecece8] px-2 py-4 last:border-0"
                >
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      bug.status === "Resolved"
                        ? "bg-emerald-500"
                        : bug.status === "In Progress"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{bug.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-[#858580]">
                      {bug.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full border border-[#dededb] px-2 py-0.5 text-[10px]">
                        {bug.priority}
                      </span>
                      <span className="text-[10px] text-[#92928c]">
                        {bug.status}
                      </span>
                    </div>
                  </div>

                  <MoveUpRight className="mt-1 size-4 shrink-0 text-[#aaa9a3]" />
                </Link>
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MobileDashboard;
