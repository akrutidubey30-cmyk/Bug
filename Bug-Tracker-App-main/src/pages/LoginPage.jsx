import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import AuthBackground from "../components/AuthBackground";
import { clearAuthError, login } from "../redux/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const authError = useSelector((state) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (currentUser) {
      toast.success(`Welcome back, ${currentUser.name}!`);
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormError("");
    dispatch(clearAuthError());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^@[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      setFormError("Use username format like @username.");
      toast.error("Use username format like @username.");
      return;
    }

    dispatch(login(formData));
  };

  return (
    <section className="fixed inset-0 overflow-y-auto bg-zinc-950 text-zinc-50">
      <AuthBackground />

      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-zinc-800/80 px-6 py-4">
        <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
          Bugflow
        </span>
        <span className="text-xs text-zinc-500">Issue management system</span>
      </header>

      <div className="relative z-10 grid min-h-full place-items-center px-4 py-24">
        <form
          onSubmit={handleSubmit}
          className="auth-card w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur"
        >
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Sign in with your Bugflow username
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Username</label>
              <div className="relative">
                <UserRound className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="@username"
                  autoComplete="username"
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pr-3 pl-10 text-sm text-zinc-50 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Password</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pr-10 pl-10 text-sm text-zinc-50 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {(formError || authError) && (
              <p className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-300">
                {formError || authError}
              </p>
            )}

            <button className="h-11 w-full rounded-lg bg-zinc-50 text-sm font-semibold text-zinc-900 hover:bg-zinc-200">
              Continue
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Don&apos;t have an account?
            <Link
              to="/create-account"
              className="ml-1 text-zinc-100 hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
