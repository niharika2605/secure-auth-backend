import { useState, useEffect, useRef } from "react";

const API_BASE = "https://secure-auth-backend-a9u9.onrender.com/api/auth";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c14;
    --surface: #0d1320;
    --surface2: #111927;
    --border: rgba(255,255,255,0.07);
    --accent: #00e5ff;
    --accent2: #7b61ff;
    --danger: #ff4d6d;
    --success: #00ffa3;
    --warning: #ffb703;
    --text: #e8edf5;
    --muted: #5a6a82;
    --glow: rgba(0,229,255,0.15);
  }

  .auth-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Syne', sans-serif;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  /* Animated grid background */
  .auth-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: 
      linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .auth-root::after {
    content: '';
    position: fixed;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%);
    pointer-events: none;
    animation: drift 8s ease-in-out infinite;
  }

  @keyframes drift {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-30px, 30px); }
  }

  .blob2 {
    position: fixed;
    bottom: -150px;
    left: -150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%);
    pointer-events: none;
    animation: drift 10s ease-in-out infinite reverse;
  }

  /* Main card */
  .auth-card {
    width: 100%;
    max-width: 460px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 0 1px rgba(0,229,255,0.05), 0 40px 80px rgba(0,0,0,0.6);
    animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Top accent bar */
  .accent-bar {
    height: 3px;
    background: linear-gradient(90deg, var(--accent2), var(--accent), var(--accent2));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  @keyframes shimmer {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }

  .card-header {
    padding: 32px 36px 24px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }

  .logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-shadow: 0 0 20px rgba(0,229,255,0.3);
  }

  .logo-text {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .tab-row {
    display: flex;
    gap: 4px;
    background: var(--bg);
    border-radius: 12px;
    padding: 4px;
  }

  .tab-btn {
    flex: 1;
    padding: 9px 12px;
    border: none;
    border-radius: 9px;
    background: transparent;
    color: var(--muted);
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.05em;
  }

  .tab-btn.active {
    background: var(--surface2);
    color: var(--text);
    box-shadow: 0 1px 8px rgba(0,0,0,0.4);
  }

  .tab-btn:hover:not(.active) {
    color: var(--text);
  }

  /* Form area */
  .card-body {
    padding: 28px 36px 32px;
  }

  .form-group {
    margin-bottom: 18px;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .form-group:nth-child(2) { animation-delay: 0.05s; }
  .form-group:nth-child(3) { animation-delay: 0.1s; }

  .form-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
    font-family: 'Space Mono', monospace;
  }

  .input-wrap {
    position: relative;
  }

  .form-input {
    width: 100%;
    padding: 13px 16px 13px 44px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 11px;
    color: var(--text);
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    outline: none;
    transition: all 0.2s;
  }

  .form-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--glow);
  }

  .form-input::placeholder { color: var(--muted); }

  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    opacity: 0.5;
    pointer-events: none;
  }

  .eye-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 15px;
    padding: 4px;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: var(--text); }

  /* Password strength */
  .strength-bar {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }
  .strength-seg {
    flex: 1;
    height: 3px;
    border-radius: 99px;
    background: var(--border);
    transition: background 0.3s;
  }
  .strength-seg.weak { background: var(--danger); }
  .strength-seg.fair { background: var(--warning); }
  .strength-seg.good { background: var(--accent); }
  .strength-seg.strong { background: var(--success); }

  .strength-label {
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    margin-top: 5px;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  /* Submit button */
  .submit-btn {
    width: 100%;
    padding: 14px;
    margin-top: 8px;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    border: none;
    border-radius: 11px;
    color: #000;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .submit-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,229,255,0.3);
  }

  .submit-btn:active { transform: translateY(0); }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15));
    pointer-events: none;
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Toast / alert */
  .toast {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 11px;
    margin-bottom: 20px;
    font-size: 13px;
    line-height: 1.5;
    animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes toastIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .toast.success {
    background: rgba(0,255,163,0.08);
    border: 1px solid rgba(0,255,163,0.2);
    color: var(--success);
  }

  .toast.error {
    background: rgba(255,77,109,0.08);
    border: 1px solid rgba(255,77,109,0.2);
    color: var(--danger);
  }

  .toast-icon { font-size: 16px; flex-shrink: 0; }

  /* Profile card */
  .profile-card {
    animation: fadeUp 0.4s ease both;
  }

  .profile-avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 800;
    color: #000;
    margin: 0 auto 20px;
    box-shadow: 0 0 30px rgba(0,229,255,0.25);
    font-family: 'Syne', sans-serif;
  }

  .profile-name {
    text-align: center;
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .profile-email {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-bottom: 24px;
  }

  .profile-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  .profile-stat {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
  }

  .stat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-bottom: 6px;
  }

  .stat-value {
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
  }

  .stat-value.accent { color: var(--accent); }
  .stat-value.success { color: var(--success); }

  .token-section {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 20px;
  }

  .token-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .token-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
  }

  .token-badge {
    font-size: 10px;
    font-family: 'Space Mono', monospace;
    padding: 3px 8px;
    border-radius: 99px;
    background: rgba(0,255,163,0.1);
    color: var(--success);
    border: 1px solid rgba(0,255,163,0.2);
  }

  .token-value {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    word-break: break-all;
    opacity: 0.7;
    line-height: 1.6;
  }

  /* Timer */
  .timer-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding: 10px 14px;
    background: rgba(255,183,3,0.06);
    border: 1px solid rgba(255,183,3,0.15);
    border-radius: 10px;
  }

  .timer-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--warning);
    animation: pulse 1.5s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  .timer-text {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: var(--warning);
  }

  .logout-btn {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid rgba(255,77,109,0.3);
    border-radius: 11px;
    color: var(--danger);
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }

  .logout-btn:hover {
    background: rgba(255,77,109,0.08);
    border-color: var(--danger);
    box-shadow: 0 4px 16px rgba(255,77,109,0.15);
  }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    color: var(--muted);
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }

  .footer-link {
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
    cursor: pointer;
  }
  .footer-link:hover { color: var(--accent); }

  .security-badges {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-family: 'Space Mono', monospace;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .badge span:first-child { font-size: 12px; }
`;

function getPasswordStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_CLASSES = ["", "weak", "fair", "good", "strong"];

export default function SecureAuth() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tokenTtl, setTokenTtl] = useState(900);
  const timerRef = useRef(null);

  const strength = getPasswordStrength(password);

  useEffect(() => {
    if (accessToken) {
      setTokenTtl(900);
      timerRef.current = setInterval(() => {
        setTokenTtl(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [accessToken]);

  function showToast(type, msg) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  }

  async function handleSubmit() {
    if (!email || !password) return showToast("error", "Please fill in all fields.");
    setLoading(true);
    try {
      if (tab === "register") {
        const res = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");
        showToast("success", "Account created! You can now log in.");
        setTab("login");
      } else {
        const res = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        setAccessToken(data.accessToken);
        showToast("success", "Authenticated successfully. Welcome back!");
        setTab("profile");
        fetchProfile(data.accessToken);
      }
    } catch (e) {
      showToast("error", e.message);
    }
    setLoading(false);
  }

  async function fetchProfile(token) {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not fetch profile");
      setProfile(data);
    } catch (e) {
      showToast("error", e.message);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ refreshToken: "" }),
      });
    } catch (_) {}
    setAccessToken(null);
    setProfile(null);
    setEmail("");
    setPassword("");
    setName("");
    setTab("login");
    clearInterval(timerRef.current);
    showToast("success", "You've been securely logged out.");
    setLoading(false);
  }

  function formatTtl(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  function maskToken(t) {
    if (!t) return "";
    return t.slice(0, 24) + "••••••••••••••••" + t.slice(-8);
  }

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="blob2" />
        <div className="auth-card">
          <div className="accent-bar" />

          <div className="card-header">
            <div className="logo-row">
              <div className="logo-icon">🔐</div>
              <span className="logo-text">SecureAuth v2</span>
            </div>
            <div className="tab-row">
              <button className={`tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); setToast(null); }}>Login</button>
              <button className={`tab-btn ${tab === "register" ? "active" : ""}`} onClick={() => { setTab("register"); setToast(null); }}>Register</button>
              <button className={`tab-btn ${tab === "profile" ? "active" : ""}`} onClick={() => { if (accessToken) setTab("profile"); }}>Profile</button>
            </div>
          </div>

          <div className="card-body">
            {toast && (
              <div className={`toast ${toast.type}`}>
                <span className="toast-icon">{toast.type === "success" ? "✓" : "⚠"}</span>
                <span>{toast.msg}</span>
              </div>
            )}

            {(tab === "login" || tab === "register") && (
              <>
                {tab === "register" && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="input-wrap">
                      <span className="input-icon">👤</span>
                      <input className="form-input" type="text" placeholder="Niharika Sharma" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrap">
                    <span className="input-icon">✉</span>
                    <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrap">
                    <span className="input-icon">🔑</span>
                    <input className="form-input" type={showPw ? "text" : "password"} placeholder="••••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="eye-btn" onClick={() => setShowPw(!showPw)}>{showPw ? "🙈" : "👁"}</button>
                  </div>
                  {tab === "register" && password && (
                    <>
                      <div className="strength-bar">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`strength-seg ${i <= strength ? STRENGTH_CLASSES[strength] : ""}`} />
                        ))}
                      </div>
                      <div className="strength-label">{STRENGTH_LABELS[strength]} password</div>
                    </>
                  )}
                </div>

                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                  {loading && <span className="spinner" />}
                  {loading ? "Processing..." : tab === "login" ? "Sign In" : "Create Account"}
                </button>

                <div className="security-badges">
                  <div className="badge"><span>🔒</span> bcrypt</div>
                  <div className="badge"><span>⚡</span> JWT</div>
                  <div className="badge"><span>🛡</span> Rate limited</div>
                </div>
              </>
            )}

            {tab === "profile" && (
              <div className="profile-card">
                {!accessToken ? (
                  <div style={{textAlign:"center",color:"var(--muted)",padding:"20px 0"}}>
                    <div style={{fontSize:"32px",marginBottom:"12px"}}>🔒</div>
                    <div style={{fontSize:"14px"}}>Log in to view your profile</div>
                  </div>
                ) : (
                  <>
                    <div className="profile-avatar">
                      {(profile?.name || email || "?")[0].toUpperCase()}
                    </div>
                    <div className="profile-name">{profile?.name || "User"}</div>
                    <div className="profile-email">{profile?.email || email}</div>

                    {tokenTtl > 0 ? (
                      <div className="timer-row">
                        <div className="timer-dot" />
                        <div className="timer-text">Session expires in {formatTtl(tokenTtl)}</div>
                      </div>
                    ) : (
                      <div className="timer-row" style={{background:"rgba(255,77,109,0.06)",borderColor:"rgba(255,77,109,0.2)"}}>
                        <div className="timer-dot" style={{background:"var(--danger)"}} />
                        <div className="timer-text" style={{color:"var(--danger)"}}>Session expired — please refresh token</div>
                      </div>
                    )}

                    <div className="profile-grid">
                      <div className="profile-stat">
                        <div className="stat-label">Role</div>
                        <div className="stat-value accent">{profile?.role || "user"}</div>
                      </div>
                      <div className="profile-stat">
                        <div className="stat-label">Status</div>
                        <div className="stat-value success">● Active</div>
                      </div>
                      <div className="profile-stat">
                        <div className="stat-label">Auth Method</div>
                        <div className="stat-value">JWT / Bearer</div>
                      </div>
                      <div className="profile-stat">
                        <div className="stat-label">Token TTL</div>
                        <div className="stat-value">{formatTtl(tokenTtl)}</div>
                      </div>
                    </div>

                    <div className="token-section">
                      <div className="token-header">
                        <span className="token-title">Access Token</span>
                        <span className="token-badge">VALID</span>
                      </div>
                      <div className="token-value">{maskToken(accessToken)}</div>
                    </div>

                    <button className="logout-btn" onClick={handleLogout} disabled={loading}>
                      {loading ? <><span className="spinner" />Signing out...</> : "↪ Sign Out"}
                    </button>
                  </>
                )}
              </div>
            )}

            <div className="footer-links">
              <span className="footer-link">Privacy Policy</span>
              <span className="footer-link">Terms</span>
              <span className="footer-link">API Docs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}