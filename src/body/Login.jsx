import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { PostRequest } from "../../services/http";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await PostRequest("users/login", {
        email,
        password,
      });

      // Check the response from your backend
      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Unable to log in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* Left: Welcome panel */}
        <div className="relative hidden min-[450px]:flex min-h-[300px] flex-col justify-between overflow-hidden bg-primary p-8 text-white sm:p-12 md:min-h-[600px]">
          {/* Decorative circles */}
          {/* <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" /> */}

          <div className="relative z-10">
            <div className="mb-12 flex items-center gap-3">
              <span className="text-2xl font-bold tracking-wide">
                Pages<span className="text-amber-300">.</span>
              </span>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
              Your next chapter starts here
            </p>

            <h1 className="max-w-sm text-4xl font-bold leading-tight sm:text-5xl">
              Every book opens a new world.
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-white/75">
              Discover stories that inspire you, ideas that challenge you, and
              books that stay with you forever.
            </p>
          </div>

          <div className="relative z-10 mt-12 border-t border-white/20 pt-6">
            <p className="text-sm italic text-white/70">
              "A reader lives a thousand lives before he dies."
            </p>
            <p className="mt-2 text-xs text-white/50">— George R. R. Martin</p>
          </div>
        </div>

        {/* Right: Login form */}
        <div className="flex flex-col justify-center p-7 sm:p-12 md:p-14">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Welcome back
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-stone-800">
              Sign in to Pages
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Pick up where you left off. Your next favorite book awaits.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Email
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Mail size={19} className="shrink-0 text-stone-400" />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-stone-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Lock size={19} className="shrink-0 text-stone-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-xs font-medium text-stone-500 hover:text-primary"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              onClick={handleLogin}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              Log in
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-stone-200" />
            <span className="text-xs text-stone-400">NEW TO PAGES?</span>
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          <Link
            to="/signup"
            className="flex w-full items-center justify-center rounded-xl border border-stone-200 px-5 py-3 font-semibold text-stone-700 transition hover:border-primary hover:bg-stone-50 hover:text-primary"
          >
            Create an account
          </Link>

          <p className="mt-8 text-center text-xs leading-5 text-stone-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
