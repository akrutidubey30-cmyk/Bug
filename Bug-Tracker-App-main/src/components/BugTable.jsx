import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { deleteBug, updateBugStatus } from "../redux/bugsSlice";

const BugTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bugs = useSelector((state) => state.bugs.bugs);
  const recentBugs = bugs.slice(-3).reverse();

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-[#dededb] px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a8a85]">
            Recent issues
          </p>
          <p className="mt-1 text-sm text-[#767671]">Manage all reported product bugs</p>
        </div>
        <button
          onClick={() => navigate("/bugs")}
          className="rounded-md border border-[#dededb] px-3 py-1.5 text-xs font-medium hover:bg-[#f3f3f0]"
        >
          View more →
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-[#dededb] text-[10px] uppercase tracking-[0.12em] text-[#969690]">
            <tr>
              <th className="px-5 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {bugs.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-5 py-12 text-center text-[#8a8a85]">
                  No bugs yet. Report your first issue.
                </td>
              </tr>
            ) : (
              recentBugs.map((bug) => (
                <tr key={bug.id} className="border-b border-[#ecece8] last:border-0">
                  <td className="max-w-xs px-5 py-4">
                    <Link
                      to={`/bugs/${bug.id}`}
                      className="truncate font-medium hover:underline"
                    >
                      {bug.title}
                    </Link>
                    <p className="mt-1 truncate text-xs text-[#92928d]">{bug.description}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-[#dededb] px-2.5 py-1 text-xs">
                      {bug.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={bug.status}
                      onChange={(event) => {
                        dispatch(
                          updateBugStatus({
                            bugId: bug.id,
                            newStatus: event.target.value,
                          })
                        );
                        toast.success("Bug status updated!");
                      }}
                      className="rounded-md border border-[#dededb] bg-white px-2 py-1.5 text-xs outline-none"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => {
                        toast((toastItem) => (
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-medium">Delete this bug?</p>
                              <p className="mt-1 text-xs text-zinc-400">
                                This action cannot be undone.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => toast.dismiss(toastItem.id)}
                                className="rounded-md border border-zinc-600 px-2.5 py-1.5 text-xs"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  dispatch(deleteBug(bug.id));
                                  toast.dismiss(toastItem.id);
                                  toast.success("Bug deleted!");
                                }}
                                className="rounded-md bg-red-500 px-2.5 py-1.5 text-xs text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ), { duration: Infinity });
                      }}
                      className="text-xs font-medium text-[#d9584f] hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BugTable;
