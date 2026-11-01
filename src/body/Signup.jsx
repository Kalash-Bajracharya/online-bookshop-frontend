import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, User, Mail, Lock, ArrowRight } from "lucide-react";
import { PostRequest } from "../../services/http";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
console.log("Signup values:", { name, email, password });
      const response = await PostRequest("users/create", {
        name,
        email,
        password,
      });

      alert(response.data.message || "Account created successfully!");
      navigate("/Login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl min-[450px]:grid-cols-2">

        {/* Left: Branding */}
        <div className="relative hidden min-[450px]:flex min-h-[600px] flex-col justify-between overflow-hidden bg-primary p-8 text-white sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="mb-12 flex items-center gap-3">
              
              <span className="text-2xl font-bold tracking-wide">
                Pages<span className="text-amber-300">.</span>
              </span>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
              Begin your next chapter
            </p>

            <h1 className="max-w-sm text-4xl font-bold leading-tight sm:text-5xl">
              A world of stories awaits you.
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-white/75">
              Create your account and discover books, explore new ideas,
              and find the stories you'll love.
            </p>
          </div>

          <div className="relative z-10 mt-12 border-t border-white/20 pt-6">
            <p className="text-sm italic text-white/70">
              "Today a reader, tomorrow a leader."
            </p>
            <p className="mt-2 text-xs text-white/50">
              — Margaret Fuller
            </p>
          </div>
        </div>

        {/* Right: Signup form */}
        <div className="flex flex-col justify-center p-7 sm:p-12 md:p-14">
          <div className="mb-7">
            <div className="mb-5 flex items-center gap-2 min-[450px]:hidden">
              <BookOpen className="text-primary" size={28} />
              <span className="text-2xl font-bold text-stone-800">
                Pages<span className="text-primary">.</span>
              </span>
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Join our community
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-stone-800">
              Create an account
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Sign up to start your reading journey with Pages.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Full name */}
            <div>
              <label  className="mb-2 block text-sm font-semibold text-stone-700">
                Full name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <User size={19} className="shrink-0 text-stone-400" />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-stone-700">
                Email address
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
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-stone-700">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Lock size={19} className="shrink-0 text-stone-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                  className="w-full min-w-0 bg-transparent py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
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

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-stone-700">
                Confirm password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Lock size={19} className="shrink-0 text-stone-400" />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full min-w-0 bg-transparent py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="shrink-0 text-xs font-medium text-stone-500 hover:text-primary"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && (
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>

          <p className="mt-6 text-center text-xs leading-5 text-stone-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;