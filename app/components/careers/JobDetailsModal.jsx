'use client';

import { motion } from 'framer-motion';
import {
  X,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
  Target,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function JobDetailsModal({ job, isOpen, onClose, onApply }) {
  if (!isOpen || !job) return null;

  const handleShare = () => {
    const url = `${window.location.origin}/careers/${job.slug || job.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success('Job link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-background/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-border bg-secondary/30 flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {job.department}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                {job.employment_type}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                {job.work_mode}
              </span>
              {job.is_paid && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {job.stipend_amount || 'Paid Stipend'}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-foreground">
              {job.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {job.working_hours} &bull; {job.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Deadline: {job.formatted_deadline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              title="Copy link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Role Overview
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
              {job.full_description || job.short_description}
            </p>
          </div>

          {/* Working Details */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground block mb-0.5">Working Arrangements</span>
              <p className="text-foreground font-medium">{job.working_schedule || 'Flexible'} &bull; {job.working_hours}</p>
            </div>
            <div>
              <span className="text-muted-foreground block mb-0.5">Compensation</span>
              <p className="text-primary font-semibold">
                {job.is_paid ? (job.stipend_amount || 'Paid') : 'Unpaid Learning Role'}
              </p>
            </div>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                Responsibilities
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Qualifications */}
          {job.required_qualifications && job.required_qualifications.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                Requirements
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {job.required_qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What candidate will gain */}
          {job.candidate_benefits && job.candidate_benefits.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Award className="w-4 h-4" /> What You Will Gain
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {job.candidate_benefits.map((b, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border text-foreground/90 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KPIs */}
          {job.kpis && job.kpis.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Key Performance Indicators (KPIs)
              </h3>
              <div className="space-y-2 text-xs">
                {job.kpis.map((kpi, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border space-y-1">
                    <div className="flex items-center justify-between font-medium text-foreground">
                      <span>{kpi.title}</span>
                      {kpi.weight ? <span className="text-primary font-semibold">{kpi.weight}%</span> : null}
                    </div>
                    {kpi.explanation && <p className="text-muted-foreground">{kpi.explanation}</p>}
                    {kpi.target && <p className="text-[11px] text-muted-foreground">Target: {kpi.target}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-border bg-secondary/30 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground hidden sm:block">
            Apply before {job.formatted_deadline}
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onClose();
                onApply(job);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center gap-1.5"
            >
              Apply Now <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
