import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import AuthBackground from "../components/AuthBackground";
import {
  clearAuthError,
  createAccount,
} from "../redux/authSlice";

const CreateAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const authError = useSelector((state) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (currentUser) {
      toast.success("Account created successfully!");
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
      setFormError(
        "Username must start with @ and contain 3-20 letters, numbers or underscores."
      );
      toast.error("Use a valid username like @username.");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    dispatch(
      createAccount({
        name: formData.name,
        username: formData.username,
        password: formData.password,
      })
    );
  };

  return (
    <section className="fixed inset-0 overflow-y-auto bg-zinc-950 text-zinc-50">
      <AuthBackground />

      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-zinc-800/80 px-6 py-4">
        <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
          Bugflow
        </span>
        <Link to="/login" className="text-xs text-zinc-400 hover:text-white">
          Back to login
        </Link>
      </header>

      <div className="relative z-10 grid min-h-full place-items-center px-4 py-24">
        <form
          onSubmit={handleSubmit}
          className="auth-card w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur"
        >
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Create your username-based Bugflow account
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none placeholder:text-zinc-600"
              />
            </div>

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
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pr-3 pl-10 text-sm outline-none placeholder:text-zinc-600"
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
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 pr-10 pl-10 text-sm outline-none placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Enter password again"
                autoComplete="new-password"
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none placeholder:text-zinc-600"
              />
            </div>

            {(formError || authError) && (
              <p className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-300">
                {formError || authError}
              </p>
            )}

            <button className="h-11 w-full rounded-lg bg-zinc-50 text-sm font-semibold text-zinc-900 hover:bg-zinc-200">
              Create account
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?
            <Link to="/login" className="ml-1 text-zinc-100 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default CreateAccountPage;
