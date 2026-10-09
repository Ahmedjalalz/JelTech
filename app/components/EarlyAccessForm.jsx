'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EarlyAccessForm = ({
  productName = "GrowthPilot AI",
  compact = false,
  className = "",
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [businessType, setBusinessType] = useState('E-Commerce / Online Store');
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
          website: website || undefined,
          businessType: businessType || undefined,
          interest: productName,
          wave: 'Wave 1 Priority Queue',
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data?.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-6 rounded-2xl bg-card border-2 border-primary/40 shadow-xl text-left ${className}`}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Queue Position Confirmed
              </span>
              <span className="text-xs text-muted-foreground">Wave 1 Early Access</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-foreground">
              You&apos;re Added to the Wave 1 Priority Queue!
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We are releasing <strong>{productName}</strong> in structured rollout waves to guarantee hands-on onboarding.
              Your application has been received and queued for <strong>Wave 1</strong>. We will notify you at <strong className="text-foreground">{email}</strong> as your onboarding slot unlocks.
            </p>
            <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span>Cohort: <strong>Wave 1 (Opening Soon)</strong></span>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setEmail('');
                  setName('');
                  setWebsite('');
                }}
                className="text-primary hover:underline font-semibold"
              >
                Submit another application &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`text-left ${className}`}>
      <div className="space-y-4">
        {compact ? (
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email to join Wave 1 queue..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <Button
                type="submit"
                variant="hero"
                size="default"
                disabled={status === 'loading'}
                className="gap-2 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining Queue...
                  </>
                ) : (
                  <>
                    Join Wave 1 Queue
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
              <span>Releasing in structured waves · Sign up for Wave 1</span>
              <span className="text-emerald-400 font-semibold">Priority Queue Open</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Wave Announcement Banner */}
            <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/25 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Releasing in Waves:</strong> We are launching in controlled rollout waves to provide close onboarding support. Sign up below to join the priority queue and be part of the <strong>first wave</strong>.
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Your Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="operator@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center justify-between">
                  <span>Business / Website URL</span>
                  <span className="text-[10px] text-muted-foreground font-normal">Helps wave placement</span>
                </label>
                <input
                  type="text"
                  placeholder="https://yourbusiness.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Business Category
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="E-Commerce / Online Store">E-Commerce / DTC Brand</option>
                  <option value="Local Service / Trades">Local Service / Contractor</option>
                  <option value="Appointment / Clinic / Salon">Appointment / Clinic / Salon</option>
                  <option value="Rental / Property / Vehicles">Rental / Property / Vehicles</option>
                  <option value="B2B / Technology">B2B / Custom Manufacturer</option>
                  <option value="Other">Other Business</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>You will be added to the queue in order of submission</span>
              </div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={status === 'loading'}
                className="gap-2 w-full sm:w-auto"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Apply to Join Wave 1
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-xs text-rose-400 mt-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </form>
  );
};
