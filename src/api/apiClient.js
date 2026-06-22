// Lightweight replacement for the legacy client integration
// Exposes a stable client object used across the app.
const storageKey = 'ocean_token';

/** @type {{ env: Record<string, string> }} */
const importMeta = import.meta;

const getStoredToken = () => {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
};

const setStoredToken = (t) => {
  try { localStorage.setItem(storageKey, t); } catch {}
};

const removeStoredToken = () => {
  try { localStorage.removeItem(storageKey); } catch {}
};

const callApi = async (path, opts = {}) => {
  const base = importMeta.env.VITE_APP_BASE_URL || '';
  const url = `${base}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = getStoredToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { method: opts.method || 'POST', headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
};

export const apiClient = {
  auth: {
    me: async () => {
      // Try to get a user from token (not implemented server-side) — return null-safe object
      const token = getStoredToken();
      if (!token) return null;
      // If backend exposes a /api/me endpoint, call it
      try {
        const base = importMeta.env.VITE_APP_BASE_URL || '';
        const res = await fetch(`${base}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) return null;
        return res.json();
      } catch {
        return null;
      }
    },
    logout: (redirect) => {
      removeStoredToken();
      if (redirect) window.location.href = redirect;
    },
    redirectToLogin: (redirect) => {
      const next = redirect || window.location.href;
      window.location.href = `/login?next=${encodeURIComponent(next)}`;
    },
    resetPasswordRequest: async (email) => {
      // best-effort: call backend reset endpoint if present
      try {
        await callApi('/api/auth/reset-request', { body: { email } });
      } catch {
        // ignore
      }
      return true;
    },
    resetPassword: async ({ resetToken, newPassword }) => {
      try {
        await callApi('/api/auth/reset', { body: { resetToken, newPassword } });
        return true;
      } catch {
        return false;
      }
    },
    loginViaEmailPassword: async (email, password) => {
      try {
        const resp = await callApi('/api/auth/login', { body: { email, password } });
        if (resp?.access_token) setStoredToken(resp.access_token);
        return resp;
      } catch (err) {
        throw err;
      }
    },
    loginWithProvider: (provider, redirect) => {
      // Fallback: do a client-side redirect to an OAuth route if present
      window.location.href = `/auth/${provider}${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`;
    },
    register: async ({ email, password }) => {
      try {
        const resp = await callApi('/api/auth/register', { body: { email, password } });
        if (resp?.access_token) setStoredToken(resp.access_token);
        return resp;
      } catch (err) {
        throw err;
      }
    },
    verifyOtp: async ({ email, otpCode }) => {
      try {
        const resp = await callApi('/api/auth/verify-otp', { body: { email, otpCode } });
        if (resp?.access_token) setStoredToken(resp.access_token);
        return resp;
      } catch (err) {
        throw err;
      }
    },
    setToken: (token) => setStoredToken(token),
    resendOtp: async (email) => {
      try {
        await callApi('/api/auth/resend-otp', { body: { email } });
        return true;
      } catch {
        return false;
      }
    }
  },
  integrations: {
    Core: {
      InvokeLLM: async ({ prompt, model }) => {
        // Best-effort: call backend chat endpoint (uses seeded region 1)
        try {
          const resp = await callApi('/api/chat', { body: { region_id: 1, question: prompt } });
          return resp.answer || '';
        } catch (err) {
          // Fallback: return a helpful error message
          return "I'm having trouble reaching the AI service right now.";
        }
      }
    }
  }
};

export default apiClient;
