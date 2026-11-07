import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, AlertCircle, Loader2, KeyRound } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: { id: string; email: string; role: string }) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      setErrorMessage('Please enter both Admin ID / Email and Password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId: adminId.trim(),
          password,
          twoFactorCode: showTwoFactor ? twoFactorCode.trim() : undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        onLoginSuccess(data.user);
      } else {
        if (data?.lockoutRemaining) {
          setLockoutRemaining(data.lockoutRemaining);
          setErrorMessage(
            `Security lock active: Too many failed attempts. Please try again in ${Math.ceil(
              data.lockoutRemaining / 60
            )} minutes.`
          );
        } else if (data?.requiresTwoFactor) {
          setShowTwoFactor(true);
          setErrorMessage('Please enter your Two-Factor Authentication (2FA) verification code.');
        } else {
          // Strict security mandate: generic authentication failure message
          setErrorMessage(data?.error || 'Invalid credentials or access denied.');
        }
      }
    } catch {
      setErrorMessage('Unable to connect to the authentication server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
      {/* Container */}
      <div className="w-full max-w-md">
        {/* Security badge & logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-xl mb-4 text-emerald-400">
            <Lock className="w-7 h-7" />
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
            TUNA NP PORTLINK LOGISTICS
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            ADMIN PORTAL
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Restricted Content Management System & Operational Administration
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1E293B] rounded-2xl border border-slate-700/80 p-8 shadow-2xl relative">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs leading-relaxed animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {lockoutRemaining && (
            <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>
                Brute-force protection enabled. System has temporarily locked access for this identifier.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email / Admin ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email / Admin ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoComplete="username"
                  required
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="admin@tunanpportlink.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  disabled={loading || !!lockoutRemaining}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  disabled={loading || !!lockoutRemaining}
                />
              </div>
            </div>

            {/* Optional 2FA Code */}
            {showTwoFactor && (
              <div className="pt-2 animate-in fade-in duration-200">
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  Two-Factor Authentication (2FA) Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="6-digit TOTP code"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-emerald-500/50 rounded-xl text-sm text-center tracking-widest font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !!lockoutRemaining}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <span>SIGN IN</span>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Authorized personnel only. All administrative access, session tokens, and IP
              addresses are audited and logged with cryptographic rate-limiting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
