import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { deleteBug, updateBugStatus } from "../redux/bugsSlice";

const AllBugsPage = () => {
  const dispatch = useDispatch();
  const bugs = useSelector((state) => state.bugs.bugs);

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-[#dededb] bg-white">
      <div className="border-b border-[#dededb] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#92928c]">
          Issue directory
        </p>
        <h2 className="mt-1 text-xl font-semibold">All bugs</h2>
        <p className="mt-1 text-sm text-[#858580]">
          Display, update and delete every reported issue.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-[#dededb] text-[10px] uppercase tracking-[0.12em] text-[#969690]">
            <tr>
              <th className="px-5 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} className="border-b border-[#ecece8] last:border-0">
                <td className="max-w-sm px-5 py-4">
                  <Link to={`/bugs/${bug.id}`} className="font-medium hover:underline">
                    {bug.title}
                  </Link>
                  <p className="mt-1 truncate text-xs text-[#92928d]">{bug.description}</p>
                </td>
                <td className="px-4 py-4 text-xs text-[#777772]">
                  {bug.createdAt || "Recently"}
                </td>
                <td className="px-4 py-4 text-xs">{bug.priority}</td>
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
                    className="rounded-md border border-[#dededb] bg-white px-2 py-1.5 text-xs"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/bugs/${bug.id}/edit`}
                      className="text-xs font-medium hover:underline"
                    >
                      Edit
                    </Link>
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
                      className="text-xs font-medium text-[#d9584f]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllBugsPage;
