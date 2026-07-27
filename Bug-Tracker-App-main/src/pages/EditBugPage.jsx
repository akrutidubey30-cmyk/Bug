import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { updateBug } from "../redux/bugsSlice";

const EditBugPage = () => {
  const { bugId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bug = useSelector((state) =>
    state.bugs.bugs.find((item) => item.id === bugId)
  );
  const [formData, setFormData] = useState({
    title: bug?.title || "",
    description: bug?.description || "",
    priority: bug?.priority || "Medium",
    status: bug?.status || "Open",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      updateBug({
        id: bug.id,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
      })
    );

    toast.success("Bug updated successfully!");
    navigate(`/bugs/${bug.id}`);
  };

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
        <Link to={`/bugs/${bug.id}`} className="text-xs text-[#777772]">
          ← Back to bug
        </Link>
        <h2 className="mt-4 text-2xl font-semibold">Edit bug</h2>
        <p className="mt-2 text-sm text-[#858580]">
          Update the issue information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-[#5f5f5a]">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="h-11 w-full rounded-lg border border-[#dededb] bg-white px-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#5f5f5a]">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full rounded-lg border border-[#dededb] bg-white p-3 text-sm outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-[#5f5f5a]">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-[#dededb] bg-white px-3 text-sm"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#5f5f5a]">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-[#dededb] bg-white px-3 text-sm"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#dededb] pt-5">
          <Link
            to={`/bugs/${bug.id}`}
            className="rounded-lg border border-[#dededb] px-4 py-2.5 text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-[#1c1c1c] px-5 py-2.5 text-sm font-medium text-white"
          >
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditBugPage;
