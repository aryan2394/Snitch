import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";

export default function Register() {
  const { handleRegister } = useAuth();
  const { loading, error } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    isSeller: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await handleRegister(form);
    if (user) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12 font-[Inter,sans-serif]">
      {/* Background texture */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwYzE5Ljg4IDAgMzYgMTYuMTIgMzYgMzZoLTE4eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black tracking-[0.3em] text-white uppercase">
            SNITCH
          </h1>
          <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mt-2">
            Street · Style · Culture
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold tracking-wide">Create Account</h2>
            <p className="text-zinc-500 text-sm mt-1">Join the movement. Drop-ready from day one.</p>
          </div>

          {/* Success flash */}
          {success && (
            <div className="mb-5 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Account created! Redirecting…
            </div>
          )}

          {/* Error */}
          {error && !success && (
            <div className="mb-5 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {typeof error === "string" ? error : "Something went wrong. Try again."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase block mb-2">
                Full Name
              </label>
              <input
                id="register-fullname"
                name="fullname"
                type="text"
                value={form.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white focus:bg-zinc-800 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase block mb-2">
                Email
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white focus:bg-zinc-800 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-white focus:bg-zinc-800 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase block mb-2">
                Contact Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm select-none">+91</span>
                <input
                  id="register-contact"
                  name="contact"
                  type="tel"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  minLength={10}
                  className="w-full bg-zinc-800/60 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl pl-14 pr-4 py-3 text-sm outline-none focus:border-white focus:bg-zinc-800 transition-all duration-200"
                />
              </div>
            </div>

            {/* Seller toggle */}
            <div className="flex items-center justify-between bg-zinc-800/40 border border-zinc-700/60 rounded-xl px-4 py-3.5">
              <div>
                <p className="text-white text-sm font-medium">Register as Seller</p>
                <p className="text-zinc-500 text-xs mt-0.5">List your drops on Snitch</p>
              </div>
              <button
                id="register-isSeller"
                type="button"
                onClick={() => setForm((p) => ({ ...p, isSeller: !p.isSeller }))}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none ${
                  form.isSeller ? "bg-white" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-all duration-300 ${
                    form.isSeller ? "translate-x-6 bg-black" : "bg-zinc-400"
                  }`}
                />
              </button>
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading || success}
              className="w-full mt-2 bg-white hover:bg-zinc-100 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold tracking-[0.15em] uppercase text-sm rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <p className="text-center text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:underline underline-offset-2 transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-xs mt-6 tracking-wider uppercase">
          © 2025 Snitch. All rights reserved.
        </p>
      </div>
    </div>
  );
}
