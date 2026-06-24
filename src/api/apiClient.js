// Lightweight replacement for the legacy client integration
// Exposes a stable client object used across the app.

const storageKey = 'ocean_token';

const getStoredToken = () => {
try {
return localStorage.getItem(storageKey);
} catch {
return null;
}
};

const setStoredToken = (t) => {
try {
localStorage.setItem(storageKey, t);
} catch {}
};

const removeStoredToken = () => {
try {
localStorage.removeItem(storageKey);
} catch {}
};

const callApi = async (path, opts = {}) => {
const base = import.meta.env.VITE_APP_BASE_URL || '';
const url = `${base}${path}`;

const headers = {
'Content-Type': 'application/json',
...(opts.headers || {})
};

const token = getStoredToken();

if (token) {
headers['Authorization'] = `Bearer ${token}`;
}

const res = await fetch(url, {
method: opts.method || 'POST',
headers,
body: opts.body ? JSON.stringify(opts.body) : undefined
});

if (!res.ok) {
const text = await res.text();
throw new Error(text || res.statusText);
}

return res.json();
};

export const apiClient = {
auth: {
me: async () => {
const token = getStoredToken();
  if (!token) return null;

  try {
    const base = import.meta.env.VITE_APP_BASE_URL || '';

    const res = await fetch(`${base}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
},

logout: (redirect) => {
  removeStoredToken();

  if (redirect) {
    window.location.href = redirect;
  }
},

redirectToLogin: (redirect) => {
  const next = redirect || window.location.href;

  window.location.href =
    `/login?next=${encodeURIComponent(next)}`;
},

resetPasswordRequest: async (email) => {
  try {
    await callApi('/api/auth/reset-request', {
      body: { email }
    });
  } catch {}

  return true;
},

resetPassword: async ({ resetToken, newPassword }) => {
  try {
    await callApi('/api/auth/reset', {
      body: {
        resetToken,
        newPassword
      }
    });

    return true;
  } catch {
    return false;
  }
},

loginViaEmailPassword: async (email, password) => {
  const resp = await callApi('/api/auth/login', {
    body: {
      email,
      password
    }
  });

  if (resp?.access_token) {
    setStoredToken(resp.access_token);
  }

  return resp;
},

loginWithProvider: (provider, redirect) => {
  window.location.href =
    `/auth/${provider}${
      redirect
        ? `?redirect=${encodeURIComponent(redirect)}`
        : ''
    }`;
},

register: async ({ email, password }) => {
  const resp = await callApi('/api/auth/register', {
    body: {
      email,
      password
    }
  });

  if (resp?.access_token) {
    setStoredToken(resp.access_token);
  }

  return resp;
},

verifyOtp: async ({ email, otpCode }) => {
  const resp = await callApi('/api/auth/verify-otp', {
    body: {
      email,
      otpCode
    }
  });

  if (resp?.access_token) {
    setStoredToken(resp.access_token);
  }

  return resp;
},

setToken: (token) => setStoredToken(token),

resendOtp: async (email) => {
  try {
    await callApi('/api/auth/resend-otp', {
      body: { email }
    });

    return true;
  } catch {
    return false;
  }
}

},

integrations: {
Core: {
InvokeLLM: async ({ prompt, model }) => {
try {
console.log("Backend URL:", import.meta.env.VITE_APP_BASE_URL);

      const resp = await callApi('/api/chat', {
        method: 'POST',
        body: {
          region_id: 1,
          question: prompt
        }
      });

      console.log("Chat Response:", resp);

      return (
        resp.answer ||
        resp.response ||
        resp.message ||
        JSON.stringify(resp)
      );
    } catch (err) {
      console.error("CHAT API ERROR:", err);

      return `API Error: ${err.message}`;
    }
  }
}


}
};

export default apiClient;
