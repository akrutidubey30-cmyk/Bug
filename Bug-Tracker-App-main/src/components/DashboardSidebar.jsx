import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Bug,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { logout } from "../redux/authSlice";
import {
  closeMobileSidebar,
  collapseSidebar,
  expandSidebar,
  toggleMobileSidebar,
  toggleSidebar,
} from "../redux/bugsSlice";

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isExpanded = useSelector((state) => state.bugs.isSidebarExpanded);
  const isMobileOpen = useSelector(
    (state) => state.bugs.isMobileSidebarOpen
  );

  const isCurrentPath = (path) => {
    return path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  };

  const handleDesktopLink = (path) => {
    if (isCurrentPath(path)) {
      dispatch(toggleSidebar());
    } else {
      dispatch(expandSidebar());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeMobileSidebar());
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const desktopLinkClass = ({ isActive }) =>
    `flex h-10 items-center gap-3 rounded-lg px-2.5 transition ${
      isActive
        ? "bg-[#e7e7e3] text-[#171717]"
        : "text-[#73736e] hover:bg-[#ecece8] hover:text-[#171717]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
      isActive ? "bg-[#eeeeeb] text-black" : "text-[#73736e]"
    }`;

  return (
    <>
      <Motion.aside
        animate={{ width: isExpanded ? 300 : 60 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onMouseEnter={() => dispatch(expandSidebar())}
        onMouseLeave={() => dispatch(collapseSidebar())}
        className="fixed inset-y-0 left-0 z-30 hidden shrink-0 flex-col overflow-hidden border-r border-[#dededb] bg-[#f3f3f0] px-2.5 py-4 md:flex"
      >
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="flex h-9 shrink-0 items-center gap-3 overflow-hidden"
        >
          <span className="grid size-9 shrink-0 place-items-center">
            <span className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
          </span>
          <Motion.span
            animate={{ opacity: isExpanded ? 1 : 0 }}
            className="whitespace-nowrap text-sm font-semibold"
          >
            Bugflow
          </Motion.span>
        </button>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          <NavLink
            to="/"
            end
            onClick={() => handleDesktopLink("/")}
            className={desktopLinkClass}
          >
            <LayoutDashboard className="size-5 shrink-0" />
            <Motion.span
              animate={{ opacity: isExpanded ? 1 : 0 }}
              className="whitespace-nowrap text-sm font-medium"
            >
              Dashboard
            </Motion.span>
          </NavLink>

          <NavLink
            to="/bugs"
            onClick={() => handleDesktopLink("/bugs")}
            className={desktopLinkClass}
          >
            <Bug className="size-5 shrink-0" />
            <Motion.span
              animate={{ opacity: isExpanded ? 1 : 0 }}
              className="whitespace-nowrap text-sm font-medium"
            >
              All bugs
            </Motion.span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => handleDesktopLink("/settings")}
            className={desktopLinkClass}
          >
            <Settings className="size-5 shrink-0" />
            <Motion.span
              animate={{ opacity: isExpanded ? 1 : 0 }}
              className="whitespace-nowrap text-sm font-medium"
            >
              Settings
            </Motion.span>
          </NavLink>
        </nav>

        <div className="space-y-2">
          <button
            onClick={handleLogout}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-2.5 text-[#73736e] hover:bg-[#ecece8]"
          >
            <LogOut className="size-5 shrink-0" />
            <Motion.span
              animate={{ opacity: isExpanded ? 1 : 0 }}
              className="whitespace-nowrap text-sm font-medium"
            >
              Log out
            </Motion.span>
          </button>

          <div className="flex h-10 items-center gap-3 overflow-hidden px-1">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#d9ff66] text-[10px] font-bold">
              AD
            </span>
            <Motion.span
              animate={{ opacity: isExpanded ? 1 : 0 }}
              className="whitespace-nowrap text-sm font-medium"
            >
              {currentUser?.name}
            </Motion.span>
          </div>
        </div>
      </Motion.aside>

      <button
        onClick={() => dispatch(toggleMobileSidebar())}
        className="fixed top-4 left-4 z-40 text-[#454541] md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-6" />
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <Motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-white p-7 md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
                <span className="font-semibold">Bugflow</span>
              </div>
              <button
                onClick={() => dispatch(closeMobileSidebar())}
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-2">
              <NavLink
                to="/"
                end
                onClick={() => dispatch(closeMobileSidebar())}
                className={mobileLinkClass}
              >
                <LayoutDashboard className="size-5" />
                Dashboard
              </NavLink>
              <NavLink
                to="/bugs"
                onClick={() => dispatch(closeMobileSidebar())}
                className={mobileLinkClass}
              >
                <Bug className="size-5" />
                All bugs
              </NavLink>
              <NavLink
                to="/settings"
                onClick={() => dispatch(closeMobileSidebar())}
                className={mobileLinkClass}
              >
                <Settings className="size-5" />
                Settings
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#73736e]"
              >
                <LogOut className="size-5" />
                Log out
              </button>
            </nav>

            <div className="flex items-center gap-3 border-t border-[#e5e5e1] pt-5">
              <span className="grid size-9 place-items-center rounded-full bg-[#d9ff66] text-xs font-bold">
                AD
              </span>
              <div>
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-[#8a8a85]">
                  {currentUser?.username}
                </p>
              </div>
            </div>
          </Motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
