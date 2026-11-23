'use client';

import { useState } from 'react';
import { Lock, User, ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      onLoginSuccess(data.username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-foreground">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto text-primary mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Careers Admin
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in with your admin account to manage openings &amp; applications
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-medium text-foreground">Email / Username</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                placeholder="admin@jeltech.net"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                placeholder="Password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold py-2 mt-2"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
            Sign In <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </form>

        <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          Session secured
        </p>
      </div>
    </div>
  );
}
