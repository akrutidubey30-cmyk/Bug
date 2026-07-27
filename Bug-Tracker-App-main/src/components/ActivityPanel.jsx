import { useSelector } from "react-redux";

const ActivityPanel = () => {
  const bugs = useSelector((state) => state.bugs.bugs);
  const highPriority = bugs.filter((bug) => bug.priority === "High").length;
  const resolved = bugs.filter((bug) => bug.status === "Resolved").length;
  const health = bugs.length ? Math.round((resolved / bugs.length) * 100) : 100;

  return (
    <aside className="min-h-0 overflow-y-auto">
      <section className="border-b border-[#dededb] p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a8a85]">
          Project health
        </p>
        <div className="mt-5 flex items-center gap-5">
          <div
            className="grid size-24 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#9bc53d ${health}%, #eeeeea ${health}% 100%)`,
            }}
          >
            <div className="grid size-19 place-items-center rounded-full bg-white text-xl font-medium">
              {health}%
            </div>
          </div>
          <div>
            <p className="font-medium">Resolution health</p>
            <p className="mt-1 text-xs leading-5 text-[#858580]">
              {resolved} of {bugs.length} issues have been resolved.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dededb] p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a8a85]">
            Priority mix
          </p>
          <span className="text-xs text-[#8a8a85]">{highPriority} critical</span>
        </div>
        <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-[#eeeeea]">
          <div className="bg-[#ff6b5e]" style={{ width: `${bugs.length ? (highPriority / bugs.length) * 100 : 0}%` }} />
          <div className="flex-1 bg-[#efc251]" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-[#777772]">
          <span>● High</span><span>● Medium</span><span>● Low</span>
        </div>
      </section>

      <section className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a8a85]">
          Recent activity
        </p>
        <div className="mt-5 space-y-5">
          {bugs.slice(-4).reverse().map((bug) => (
            <div key={bug.id} className="flex gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-[#9bc53d]" />
              <div>
                <p className="text-sm font-medium">{bug.title}</p>
                <p className="mt-1 text-xs text-[#91918b]">
                  {bug.status} · {bug.priority} priority
                </p>
              </div>
            </div>
          ))}
          {bugs.length === 0 && (
            <p className="text-sm text-[#91918b]">Activity will appear here.</p>
          )}
        </div>
      </section>
    </aside>
  );
};

export default ActivityPanel;
