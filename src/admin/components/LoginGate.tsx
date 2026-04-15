import { useState } from "react";
import { authService } from "../data/authService";

interface LoginGateProps {
  children: React.ReactNode;
}

export default function LoginGate({ children }: LoginGateProps) {
  const [authenticated, setAuthenticated] = useState(() => authService.isAuthenticated());
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (authenticated) return <>{children}</>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ok = await authService.login(password);
    setLoading(false);

    if (ok) {
      setAuthenticated(true);
    } else {
      setError("Incorrect password.");
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen bg-[#1c1c18] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #f7f3ec 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#745940] mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" fill="white" opacity="0.9" />
              <rect x="11" y="2" width="7" height="7" fill="white" opacity="0.5" />
              <rect x="2" y="11" width="7" height="7" fill="white" opacity="0.5" />
              <rect x="11" y="11" width="7" height="7" fill="white" opacity="0.9" />
            </svg>
          </div>
          <h1 className="text-white font-sans text-xl font-semibold tracking-tight">Athr Admin</h1>
          <p className="text-[#605b55] text-sm mt-1 font-sans">Content Management</p>
        </div>

        <div className="bg-[#242420] border border-[#2e2e2a]">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-password" className="block text-xs uppercase tracking-widest text-[#9a9590] mb-2 font-sans">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-[#1c1c18] border border-[#2e2e2a] text-[#fdf9f2] text-sm font-sans px-4 py-3 placeholder-[#4a4844] focus:outline-none focus:border-[#745940] transition-colors"
                  autoComplete="current-password"
                  required
                />
                {error && <p className="mt-2 text-xs text-red-400 font-sans">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-[#745940] text-white text-xs uppercase tracking-widest font-sans font-medium py-3 px-6 hover:bg-[#8a6d4e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </span>
                ) : "Enter Dashboard"}
              </button>
            </form>
          </div>

          <div className="px-6 py-4 border-t border-[#2e2e2a]">
            <p className="text-[#4a4844] text-xs font-sans text-center">
              Session expires when browser tab is closed
            </p>
          </div>
        </div>

        <p className="text-center text-[#4a4844] text-xs mt-6 font-sans">
          <a href="/" className="hover:text-[#9a9590] transition-colors">Return to public site</a>
        </p>
      </div>
    </div>
  );
}
