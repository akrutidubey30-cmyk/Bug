import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { deleteBug, updateBugStatus } from "../redux/bugsSlice";

const BugDetailsPage = () => {
  const { bugId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bug = useSelector((state) =>
    state.bugs.bugs.find((item) => item.id === bugId)
  );

  if (!bug) {
    return (
      <div className="rounded-xl border border-[#dededb] bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">Bug not found</h2>
        <Link to="/bugs" className="mt-4 inline-block text-sm underline">
          Back to all bugs
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto h-full max-w-3xl overflow-y-auto rounded-xl border border-[#dededb] bg-white">
      <div className="border-b border-[#dededb] p-5">
        <Link to="/bugs" className="text-xs text-[#777772]">← All bugs</Link>
        <h2 className="mt-4 text-2xl font-semibold">{bug.title}</h2>
        <p className="mt-2 text-sm text-[#858580]">{bug.createdAt || "Recently created"}</p>
      </div>

      <div className="space-y-6 p-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#92928c]">
            Description
          </p>
          <p className="mt-2 leading-7 text-[#5f5f5a]">{bug.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#dededb] p-4">
            <p className="text-xs text-[#8a8a85]">Priority</p>
            <p className="mt-2 font-medium">{bug.priority}</p>
          </div>
          <div className="rounded-lg border border-[#dededb] p-4">
            <label className="text-xs text-[#8a8a85]">Status</label>
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
              className="mt-2 block w-full bg-white font-medium outline-none"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/bugs/${bug.id}/edit`}
            className="rounded-lg bg-[#1c1c1c] px-4 py-2.5 text-sm font-medium text-white"
          >
            Edit bug
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
                        navigate("/bugs");
                      }}
                      className="rounded-md bg-red-500 px-2.5 py-1.5 text-xs text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ), { duration: Infinity });
            }}
            className="rounded-lg bg-[#d9584f] px-4 py-2.5 text-sm font-medium text-white"
          >
            Delete bug
          </button>
        </div>
      </div>
    </section>
  );
};

export default BugDetailsPage;
