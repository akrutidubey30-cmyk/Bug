import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addBug, closeAddModal } from "../redux/bugsSlice";

const AddBugModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.bugs.isAddModalOpen);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addBug({
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: "Open",
        createdAt: new Date().toLocaleDateString(),
      })
    );

    setFormData({ title: "", description: "", priority: "Medium" });
    dispatch(closeAddModal());
    toast.success("Bug reported successfully!");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4">
      <div className="w-full max-w-lg rounded-xl border border-[#dededb] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#dededb] px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#92928c]">
              New issue
            </p>
            <h2 className="mt-1 text-lg font-semibold">Report a bug</h2>
          </div>
          <button
            onClick={() => dispatch(closeAddModal())}
            className="grid size-8 place-items-center rounded-md border border-[#dededb] text-[#777772]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-[#5f5f5a]">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Short issue title"
              className="h-11 w-full rounded-lg border border-[#d9d9d5] px-3 text-sm outline-none focus:border-[#777]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#5f5f5a]">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="What went wrong?"
              className="w-full rounded-lg border border-[#d9d9d5] p-3 text-sm outline-none focus:border-[#777]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#5f5f5a]">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-[#d9d9d5] bg-white px-3 text-sm outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 border-t border-[#ecece8] pt-5">
            <button
              type="button"
              onClick={() => dispatch(closeAddModal())}
              className="h-10 rounded-lg border border-[#dededb] px-4 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-[#1c1c1c] px-5 text-sm font-medium text-white"
            >
              Create issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBugModal;
