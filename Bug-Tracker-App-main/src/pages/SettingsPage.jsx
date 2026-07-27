import { Moon, Sun, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/bugsSlice";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.bugs.theme);
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <section className="h-full overflow-y-auto rounded-xl border border-[#dededb] bg-white">
      <div className="border-b border-[#dededb] p-5 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#92928c]">
          Workspace
        </p>
        <h2 className="mt-1 text-2xl font-semibold">Settings</h2>
        <p className="mt-2 text-sm text-[#858580]">
          Manage your profile and dashboard appearance.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-2">
        <div className="rounded-xl border border-[#dededb] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#92928c]">
            Profile
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-[#d9ff66] text-[#202020]">
              <UserRound className="size-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{currentUser.name}</h3>
              <p className="mt-1 text-sm text-[#858580]">
                {currentUser.username}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#dededb] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#92928c]">
            Appearance
          </p>
          <h3 className="mt-5 font-semibold">Dashboard theme</h3>
          <p className="mt-1 text-sm text-[#858580]">
            Choose the appearance you prefer.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                dispatch(setTheme("light"));
                toast.success("Light mode enabled!");
              }}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
                theme === "light"
                  ? "border-[#202020] bg-[#f1f1ee]"
                  : "border-[#dededb]"
              }`}
            >
              <Sun className="size-4" />
              Light
            </button>
            <button
              onClick={() => {
                dispatch(setTheme("dark"));
                toast.success("Dark mode enabled!");
              }}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
                theme === "dark"
                  ? "border-[#d9ff66] bg-[#252522]"
                  : "border-[#dededb]"
              }`}
            >
              <Moon className="size-4" />
              Dark
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
