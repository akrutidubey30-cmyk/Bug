import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import AddBugModal from "../components/AddBugModal";

const DashboardLayout = () => {
  const bugs = useSelector((state) => state.bugs.bugs);
  const isSidebarExpanded = useSelector(
    (state) => state.bugs.isSidebarExpanded
  );
  const theme = useSelector((state) => state.bugs.theme);

  useEffect(() => {
    localStorage.setItem("bugs", JSON.stringify(bugs));
  }, [bugs]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="dashboard-shell h-screen overflow-hidden bg-[#f6f6f4] text-[#171717]">
      <DashboardSidebar />

      <div
        className={`h-screen overflow-hidden transition-[padding] duration-200 ${
          isSidebarExpanded ? "md:pl-[300px]" : "md:pl-[60px]"
        }`}
      >
        <DashboardHeader />

        <main className="mx-auto h-[calc(100vh-4rem)] max-w-[1500px] overflow-hidden p-3 sm:p-5">
          <Outlet />
        </main>
      </div>

      <AddBugModal />
    </div>
  );
};

export default DashboardLayout;
