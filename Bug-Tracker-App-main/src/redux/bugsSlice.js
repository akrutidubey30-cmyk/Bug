import { createSlice } from "@reduxjs/toolkit";

const savedBugs = localStorage.getItem("bugs");
const exampleBugs = [
  {
    id: "example-1",
    title: "Login button becomes unresponsive",
    description: "The login button does not respond after an invalid attempt.",
    priority: "High",
    status: "Open",
    createdAt: "Jul 24, 2026",
  },
  {
    id: "example-2",
    title: "Dashboard cards overlap on mobile",
    description: "KPI cards overlap when the screen is smaller than 420px.",
    priority: "Medium",
    status: "In Progress",
    createdAt: "Jul 23, 2026",
  },
  {
    id: "example-3",
    title: "Success message remains visible",
    description: "The success notification does not disappear after saving.",
    priority: "Low",
    status: "Resolved",
    createdAt: "Jul 22, 2026",
  },
];
const storedBugs = savedBugs ? JSON.parse(savedBugs) : [];
const savedTheme = localStorage.getItem("theme") || "light";

const initialState = {
  bugs: storedBugs.length > 0 ? storedBugs : exampleBugs,
  isAddModalOpen: false,
  isSidebarExpanded: false,
  isMobileSidebarOpen: false,
  theme: savedTheme,
};

const bugsSlice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    addBug: (state, action) => {
      state.bugs.push(action.payload);
    },
    updateBugStatus: (state, action) => {
      const bug = state.bugs.find(
        (item) => item.id === action.payload.bugId
      );

      if (bug) {
        bug.status = action.payload.newStatus;
      }
    },
    updateBug: (state, action) => {
      const bug = state.bugs.find(
        (item) => item.id === action.payload.id
      );

      if (bug) {
        bug.title = action.payload.title;
        bug.description = action.payload.description;
        bug.priority = action.payload.priority;
        bug.status = action.payload.status;
      }
    },
    deleteBug: (state, action) => {
      state.bugs = state.bugs.filter(
        (bug) => bug.id !== action.payload
      );
    },
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarExpanded = !state.isSidebarExpanded;
    },
    expandSidebar: (state) => {
      state.isSidebarExpanded = true;
    },
    collapseSidebar: (state) => {
      state.isSidebarExpanded = false;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    },
    closeMobileSidebar: (state) => {
      state.isMobileSidebarOpen = false;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  addBug,
  updateBugStatus,
  updateBug,
  deleteBug,
  openAddModal,
  closeAddModal,
  toggleSidebar,
  expandSidebar,
  collapseSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
  setTheme,
} = bugsSlice.actions;
export default bugsSlice.reducer;
