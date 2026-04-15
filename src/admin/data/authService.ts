// ─── Admin auth — simple sha-256 password gate ────────────────────────────────
//
// The password hash is checked on login. The session is stored in sessionStorage so
// it expires when the browser tab is closed. There is no server component here —
// this is suitable for single-admin, local-access setups.
//
// To change the password, update ADMIN_PASSWORD_HASH below with the sha-256 hex
// of the new password. You can generate one at: https://emn178.github.io/online-tools/sha256.html
//
// Default password: "athr-admin-2024"
// Its sha-256 is below.

const ADMIN_PASSWORD_HASH = "50bfca6bbc49e94a54ed53ce13d65fe0150eb4d29810fb1dd4f40986a5fcc508";

// Session key in sessionStorage
const SESSION_KEY = "admin_session_v1";
// Session duration: 8 hours
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const authService = {
  async login(password: string): Promise<boolean> {
    const hash = await sha256(password);
    if (hash !== ADMIN_PASSWORD_HASH) return false;
    const session = {
      authenticated: true,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  },

  isAuthenticated(): boolean {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (!session.authenticated) return false;
      if (Date.now() > session.expiresAt) {
        sessionStorage.removeItem(SESSION_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
  },

  /** Returns the current password hash so it can be displayed for setup reference */
  getPasswordHash(): string {
    return ADMIN_PASSWORD_HASH;
  },
};

// ─── Default password helper ───────────────────────────────────────────────────
// Run this in the browser console to get your hash when changing password:
// crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR-PASSWORD'))
//   .then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''))
//   .then(console.log)
