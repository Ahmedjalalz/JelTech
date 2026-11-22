'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ApplicationModal({ job, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    education_status: 'Currently Studying',
    qualification: '',
    institution: '',
    relevant_skills: '',
    why_interested: '',
    why_consider: '',
    weekly_availability: '20-25 hours/week (Flexible)',
    linkedin_url: '',
    portfolio_url: '',
    github_url: '',
    additional_info: '',
    website_hp: '', // Honeypot
  });

  const [customAnswers, setCustomAnswers] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen || !job) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomAnswerChange = (qId, question, val) => {
    setCustomAnswers((prev) => ({
      ...prev,
      [qId]: { questionId: qId, question, answer: val },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setResumeError('');
    if (!file) {
      setResumeFile(null);
      return;
    }

    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowed.includes(file.type)) {
      setResumeError('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size must be under 5MB');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (job.require_cv && !resumeFile) {
      setErrorMsg('A CV / Resume file is required for this position.');
      return;
    }

    if (job.require_portfolio && !formData.portfolio_url.trim()) {
      setErrorMsg('A portfolio link is required for this position.');
      return;
    }

    if (job.custom_questions && job.custom_questions.length > 0) {
      for (const q of job.custom_questions) {
        if (q.required && (!customAnswers[q.id]?.answer || !customAnswers[q.id].answer.trim())) {
          setErrorMsg(`Please answer: "${q.question}"`);
          return;
        }
      }
    }

    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append('job_opening_id', job.id);
      formPayload.append('full_name', formData.full_name);
      formPayload.append('email', formData.email);
      formPayload.append('phone', formData.phone);
      formPayload.append('education_status', formData.education_status);
      formPayload.append('qualification', formData.qualification);
      formPayload.append('institution', formData.institution);
      formPayload.append('relevant_skills', formData.relevant_skills);
      formPayload.append('why_interested', formData.why_interested);
      formPayload.append('why_consider', formData.why_consider);
      formPayload.append('weekly_availability', formData.weekly_availability);
      formPayload.append('linkedin_url', formData.linkedin_url);
      formPayload.append('portfolio_url', formData.portfolio_url);
      formPayload.append('github_url', formData.github_url);
      formPayload.append('additional_info', formData.additional_info);
      formPayload.append('website_hp', formData.website_hp);

      const formattedCustomAnswers = Object.values(customAnswers);
      formPayload.append('custom_answers', JSON.stringify(formattedCustomAnswers));

      if (resumeFile) {
        formPayload.append('resume', resumeFile);
      }

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formPayload,
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Failed to submit application.');
      }

      setSubmitted(true);
      setSubmittedData(json.data);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-background/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-border bg-secondary/30 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {job.department}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                {job.employment_type} &bull; {job.work_mode}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Apply for {job.title}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Deadline: {job.formatted_deadline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Application Submitted!</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                Thank you for applying for the <span className="text-primary font-medium">{job.title}</span> position at JelTech.
              </p>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border max-w-sm mx-auto text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Application Ref:</span>
                  <span className="font-mono text-foreground font-semibold">{submittedData?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-primary font-medium">New / Under Review</span>
                </div>
              </div>
              <div className="pt-2">
                <Button onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Honeypot field for spam prevention */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={handleInputChange}
                className="hidden"
                autoComplete="off"
                tabIndex="-1"
              />

              {/* Personal Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-foreground">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      placeholder="Your full name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3 pt-3 border-t border-border">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Education Background
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {['Currently Studying', 'Completed Education', 'Other'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, education_status: status }))}
                        className={`py-2 text-xs rounded-lg border font-medium transition text-center ${
                          formData.education_status === status
                            ? 'bg-primary/10 border-primary/40 text-primary font-semibold'
                            : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Qualification / Degree (Optional)</label>
                      <input
                        type="text"
                        name="qualification"
                        placeholder="e.g. BS Computer Science"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Institution / University (Optional)</label>
                      <input
                        type="text"
                        name="institution"
                        placeholder="e.g. University / College"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Fit */}
              <div className="space-y-3 pt-3 border-t border-border">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Role Fit &amp; Availability
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Relevant Skills &amp; Tools *</label>
                    <input
                      type="text"
                      name="relevant_skills"
                      required
                      placeholder="e.g. React, Next.js, Tailwind CSS, Git"
                      value={formData.relevant_skills}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Why are you interested in this role? *</label>
                    <textarea
                      name="why_interested"
                      required
                      rows={2}
                      placeholder="What excites you about working with JelTech..."
                      value={formData.why_interested}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Why should we consider you? *</label>
                    <textarea
                      name="why_consider"
                      required
                      rows={2}
                      placeholder="Key strengths, quick learning ability, or projects..."
                      value={formData.why_consider}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Weekly Availability *</label>
                    <input
                      type="text"
                      name="weekly_availability"
                      required
                      placeholder="e.g. 20-25 hours per week"
                      value={formData.weekly_availability}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>

              {/* Links & Resume */}
              <div className="space-y-3 pt-3 border-t border-border">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Links &amp; Resume
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Portfolio / Website (Optional)</label>
                    <input
                      type="url"
                      name="portfolio_url"
                      required={job.require_portfolio}
                      placeholder="https://..."
                      value={formData.portfolio_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">GitHub or LinkedIn (Optional)</label>
                    <input
                      type="url"
                      name="github_url"
                      placeholder="https://..."
                      value={formData.github_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-foreground">
                      CV / Resume {job.require_cv ? '(Required *)' : '(Optional)'}
                    </label>
                    <div className="relative border border-dashed border-border hover:border-primary/50 transition rounded-xl p-3 text-center bg-secondary/20 cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <Upload className="w-4 h-4 text-primary shrink-0" />
                        {resumeFile ? (
                          <span className="font-medium text-foreground">{resumeFile.name}</span>
                        ) : (
                          <span className="text-muted-foreground">
                            Upload PDF or Word document (max 5MB)
                          </span>
                        )}
                      </div>
                    </div>
                    {resumeError && <p className="text-xs text-destructive mt-1">{resumeError}</p>}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Direct to JelTech team
                </span>

                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={loading} className="text-xs">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={loading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold min-w-[120px]"
                  >
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
                    Submit Application
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
