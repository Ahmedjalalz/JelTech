'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EarlyAccessForm = ({
  productName = "GrowthPilot AI",
  compact = false,
  className = "",
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          interest: productName,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus('success');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setErrorMessage(data?.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-4 rounded-xl bg-primary/10 border border-primary/30 text-left ${className}`}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">You&apos;re on the development update list</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Thank you for following {productName}&apos;s development. We will send progress updates and invite you when early access cohorts open.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-2 text-xs text-primary underline hover:opacity-80"
            >
              Register another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`text-left ${className}`}>
      <div className="space-y-3">
        {compact ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email for updates..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <Button
              type="submit"
              variant="hero"
              size="default"
              disabled={status === 'loading'}
              className="gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Follow Updates
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Your Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-muted-foreground">
                Zero spam. Transparent updates on prototype iterations and alpha testing milestones.
              </p>
              <Button
                type="submit"
                variant="hero"
                size="default"
                disabled={status === 'loading'}
                className="gap-2 w-full sm:w-auto"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Request Early Access
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-xs text-rose-400 mt-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </form>
  );
};
