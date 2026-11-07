import React, { useState, useEffect } from 'react';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboard } from './AdminDashboard';
import { Loader2 } from 'lucide-react';

export const AdminApp: React.FC = () => {
  const [user, setUser] = useState<{ id: string; email: string; role: string } | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/session');
        if (res.ok) {
          const data = await res.json();
          if (data?.authenticated && data?.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    } finally {
      setUser(null);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-3" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Verifying Admin Security Clearance...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminLoginPage onLoginSuccess={(u) => setUser(u)} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />;
};
