'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ApplicationModal } from '@/components/careers/ApplicationModal';
import { Button } from '@/components/ui/button';
import {
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
  Target,
  ArrowLeft,
  ArrowRight,
  Share2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await fetch(`/api/careers/openings/${params.id}`);
        const data = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data.error || 'Job opening not found or expired.');
        }
        setJob(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Position link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to opportunities
          </Link>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">Loading role...</p>
            </div>
          ) : error || !job ? (
            <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
              <h2 className="text-lg font-bold text-foreground">Position Not Found or Expired</h2>
              <p className="text-xs text-muted-foreground">{error}</p>
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                <Link href="/careers">Back to Careers</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Card Header */}
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {job.department}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                      {job.employment_type}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                      {job.work_mode}
                    </span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-lg border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition flex items-center gap-1 text-xs"
                    title="Share link"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {job.short_description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-border text-xs text-muted-foreground">
                  <div>
                    <span className="block text-[11px] text-muted-foreground mb-0.5">Location</span>
                    <p className="text-foreground font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}
                    </p>
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground mb-0.5">Arrangements</span>
                    <p className="text-foreground font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {job.working_hours}
                    </p>
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground mb-0.5">Deadline</span>
                    <p className="text-foreground font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> {job.formatted_deadline}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <span className="text-xs text-primary font-semibold">
                    {job.is_paid ? (job.stipend_amount || 'Paid Stipend') : 'Unpaid Learning Role'}
                  </span>
                  <Button
                    onClick={() => setIsApplyOpen(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold px-6"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Overview & Content */}
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Role Description
                  </h2>
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                    {job.full_description}
                  </p>
                </div>

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-border">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
                      What You&apos;ll Do (Responsibilities)
                    </h2>
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

                {job.required_qualifications && job.required_qualifications.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-border">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Required Skills &amp; Qualifications
                    </h2>
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

                {job.candidate_benefits && job.candidate_benefits.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-border">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> What You Will Gain
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      {job.candidate_benefits.map((b, i) => (
                        <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border text-foreground/90 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {job.kpis && job.kpis.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-border">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Target className="w-4 h-4" /> Key Performance Indicators (KPIs)
                    </h2>
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

              {/* Bottom Apply Card */}
              <div className="p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-foreground">Ready to Apply?</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Deadline: {job.formatted_deadline}
                  </p>
                </div>
                <Button
                  onClick={() => setIsApplyOpen(true)}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold px-6"
                >
                  Submit Application <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {job && (
        <ApplicationModal
          job={job}
          isOpen={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
        />
      )}
    </div>
  );
}
