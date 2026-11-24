'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KPI_PRESETS } from '@/lib/kpi-presets';
import { JobDetailsModal } from '@/components/careers/JobDetailsModal';
import { toast } from 'sonner';

export function OpeningEditorModal({
  opening,
  isOpen,
  onClose,
  onSaved,
  templates = [],
}) {
  const [formData, setFormData] = useState(getDefaultState());
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [qualificationsText, setQualificationsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Custom question state
  const [newQuestionText, setNewQuestionText] = useState('');

  function getAuthHeaders(extra = {}) {
    const headers = { ...extra };
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('jeltech_admin_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  function getDefaultState() {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return {
      title: '',
      department: 'Engineering',
      employment_type: 'Internship',
      work_mode: 'Hybrid',
      location: 'Karachi, Pakistan / Remote',
      duration: '3 months',
      working_hours: '4 hours per day',
      working_schedule: 'Flexible / Rotational',
      reporting_manager: '',
      is_paid: false,
      stipend_amount: 'PKR 25,000 / month',
      compensation_description: '',
      short_description: '',
      full_description: '',
      responsibilities: [],
      required_qualifications: [],
      preferred_qualifications: [],
      candidate_benefits: [],
      kpis: KPI_PRESETS['Web & Software Engineering'] || [],
      custom_questions: [],
      require_cv: false,
      require_portfolio: false,
      require_github: false,
      application_open_date: now.toISOString().split('T')[0],
      application_deadline: futureDate.toISOString().split('T')[0],
      recruitment_status: 'Draft',
      publication_status: 'Unpublished',
    };
  }

  useEffect(() => {
    if (opening) {
      setFormData({
        ...opening,
        application_deadline: opening.application_deadline
          ? opening.application_deadline.split('T')[0]
          : '',
        application_open_date: opening.application_open_date
          ? opening.application_open_date.split('T')[0]
          : '',
      });
      setResponsibilitiesText((opening.responsibilities || []).join('\n'));
      setQualificationsText((opening.required_qualifications || []).join('\n'));
      setBenefitsText((opening.candidate_benefits || []).join('\n'));
    } else {
      const def = getDefaultState();
      setFormData(def);
      setResponsibilitiesText([
        'Develop responsive web pages and components using React and Tailwind CSS',
        'Collaborate with designers to implement clean UI flows',
        'Integrate client interfaces with backend APIs',
      ].join('\n'));
      setQualificationsText([
        'Strong foundations in JavaScript, HTML, and CSS',
        'Familiarity with React or Next.js',
        'Understanding of Git version control',
      ].join('\n'));
      setBenefitsText([
        'Practical portfolio items shipped to live client products',
        'Mentorship and structured code reviews from senior developers',
      ].join('\n'));
    }
  }, [opening, isOpen]);

  if (!isOpen) return null;

  // Set quick deadline helper (+14, +30, +60 days)
  const setQuickDeadline = (days) => {
    const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    setFormData((p) => ({ ...p, application_deadline: d.toISOString().split('T')[0] }));
  };

  // Load KPI Presets
  const handleLoadKpiPreset = (presetName) => {
    const preset = KPI_PRESETS[presetName];
    if (preset) {
      setFormData((prev) => ({ ...prev, kpis: [...preset] }));
      toast.success(`Loaded ${presetName} KPIs`);
    }
  };

  // Load Template
  const handleLoadTemplate = (templateId) => {
    const tmpl = templates.find((t) => t.id === templateId);
    if (!tmpl) return;

    setFormData((prev) => ({
      ...prev,
      title: tmpl.name.replace(/ Template$/i, ''),
      department: tmpl.department,
      full_description: tmpl.role_description || '',
      short_description: tmpl.role_description ? tmpl.role_description.slice(0, 150) + '...' : '',
      responsibilities: tmpl.responsibilities || [],
      required_qualifications: tmpl.qualifications || [],
      candidate_benefits: tmpl.benefits || [],
      kpis: tmpl.kpis || [],
      custom_questions: tmpl.custom_questions || [],
      employment_type: tmpl.working_arrangements?.employmentType || prev.employment_type,
      work_mode: tmpl.working_arrangements?.workMode || prev.work_mode,
      duration: tmpl.working_arrangements?.duration || prev.duration,
      working_hours: tmpl.working_arrangements?.workingHours || prev.working_hours,
      is_paid: tmpl.working_arrangements?.isPaid ?? false,
      stipend_amount: tmpl.working_arrangements?.stipendAmount || '',
    }));

    setResponsibilitiesText((tmpl.responsibilities || []).join('\n'));
    setQualificationsText((tmpl.qualifications || []).join('\n'));
    setBenefitsText((tmpl.benefits || []).join('\n'));

    toast.success(`Template "${tmpl.name}" loaded!`);
  };

  // Add / Remove KPI
  const handleAddKpi = () => {
    setFormData((prev) => ({
      ...prev,
      kpis: [
        ...prev.kpis,
        { title: 'New Goal', explanation: '', target: 'On-time delivery', frequency: 'Weekly', weight: 20 },
      ],
    }));
  };

  const handleUpdateKpi = (idx, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.kpis];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, kpis: updated };
    });
  };

  const handleRemoveKpi = (idx) => {
    setFormData((prev) => ({
      ...prev,
      kpis: prev.kpis.filter((_, i) => i !== idx),
    }));
  };

  // Custom question
  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      custom_questions: [
        ...prev.custom_questions,
        { id: `q-${Date.now()}`, question: newQuestionText.trim(), type: 'text', required: true },
      ],
    }));
    setNewQuestionText('');
  };

  const handleRemoveQuestion = (id) => {
    setFormData((prev) => ({
      ...prev,
      custom_questions: prev.custom_questions.filter((q) => q.id !== id),
    }));
  };

  const totalKpiWeight = formData.kpis.reduce((acc, k) => acc + (Number(k.weight) || 0), 0);
  const hasKpiWeights = formData.kpis.some((k) => k.weight > 0);

  // Save Opening
  const handleSave = async (publishImmediate = false) => {
    if (!formData.title.trim()) {
      toast.error('Position title is required.');
      return;
    }
    if (!formData.application_deadline) {
      toast.error('Application deadline is required.');
      return;
    }

    if (publishImmediate && hasKpiWeights && totalKpiWeight !== 100) {
      toast.error(`KPI weights total ${totalKpiWeight}%. Please adjust to 100% before publishing.`);
      return;
    }

    const cleanResponsibilities = responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const cleanQualifications = qualificationsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const cleanBenefits = benefitsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    setSaving(true);
    try {
      const payload = {
        ...formData,
        short_description: formData.short_description || formData.full_description.slice(0, 160) || `${formData.title} opportunity at JelTech.`,
        responsibilities: cleanResponsibilities,
        required_qualifications: cleanQualifications,
        candidate_benefits: cleanBenefits,
        recruitment_status: publishImmediate ? 'Open' : formData.recruitment_status,
        publication_status: publishImmediate ? 'Published' : formData.publication_status,
        application_deadline: `${formData.application_deadline}T23:59:59+05:00`,
      };

      const url = opening ? `/api/admin/openings/${opening.id}` : '/api/admin/openings';
      const method = opening ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to save opening.');

      toast.success(publishImmediate ? 'Opening published!' : 'Opening saved!');
      if (onSaved) onSaved(json.data);
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Save as Template
  const handleSaveAsTemplate = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a position title first.');
      return;
    }

    const templateName = prompt('Template name:', `${formData.title} Template`);
    if (!templateName) return;

    try {
      const cleanResponsibilities = responsibilitiesText.split('\n').map((s) => s.trim()).filter(Boolean);
      const cleanQualifications = qualificationsText.split('\n').map((s) => s.trim()).filter(Boolean);
      const cleanBenefits = benefitsText.split('\n').map((s) => s.trim()).filter(Boolean);

      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          name: templateName,
          department: formData.department,
          role_description: formData.full_description || formData.short_description,
          responsibilities: cleanResponsibilities,
          qualifications: cleanQualifications,
          benefits: cleanBenefits,
          working_arrangements: {
            employmentType: formData.employment_type,
            workMode: formData.work_mode,
            location: formData.location,
            duration: formData.duration,
            workingHours: formData.working_hours,
            isPaid: formData.is_paid,
            stipendAmount: formData.stipend_amount,
          },
          kpis: formData.kpis,
          custom_questions: formData.custom_questions,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to save template.');

      toast.success('Saved as template!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-background/80 backdrop-blur-md text-foreground">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-border bg-secondary/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground">
              {opening ? `Edit: ${opening.title}` : 'Create Job Opening'}
            </h2>

            {templates.length > 0 && !opening && (
              <select
                onChange={(e) => handleLoadTemplate(e.target.value)}
                className="text-xs px-2.5 py-1 rounded-lg bg-secondary border border-border text-primary focus:outline-none focus:border-primary transition cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Load from Template...</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* Row 1: Title, Department, Compensation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-medium text-foreground">Position Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Frontend Engineer Intern"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-foreground">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">UI/UX Design</option>
                <option value="Marketing">Marketing &amp; Growth</option>
                <option value="AI Solutions">AI Solutions</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>

          {/* Row 2: Arrangements & Compensation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-secondary/30 border border-border">
            <div className="space-y-1">
              <label className="font-medium text-foreground">Type</label>
              <select
                value={formData.employment_type}
                onChange={(e) => setFormData((p) => ({ ...p, employment_type: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs"
              >
                <option value="Internship">Internship</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-foreground">Mode</label>
              <select
                value={formData.work_mode}
                onChange={(e) => setFormData((p) => ({ ...p, work_mode: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-foreground">Daily Hours</label>
              <input
                type="text"
                value={formData.working_hours}
                onChange={(e) => setFormData((p) => ({ ...p, working_hours: e.target.value }))}
                placeholder="4 hours per day"
                className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-foreground">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                placeholder="3 months"
                className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs"
              />
            </div>

            {/* Compensation Toggle */}
            <div className="col-span-2 sm:col-span-4 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Compensation:</span>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, is_paid: !p.is_paid }))}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                    formData.is_paid
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-secondary text-muted-foreground border-border'
                  }`}
                >
                  {formData.is_paid ? 'Paid / Stipend' : 'Unpaid Role'}
                </button>
              </div>

              {formData.is_paid && (
                <div className="flex items-center gap-2 flex-1 max-w-xs">
                  <span className="text-muted-foreground whitespace-nowrap">Stipend:</span>
                  <input
                    type="text"
                    value={formData.stipend_amount}
                    onChange={(e) => setFormData((p) => ({ ...p, stipend_amount: e.target.value }))}
                    placeholder="e.g. PKR 25,000 / month"
                    className="w-full px-2.5 py-1 rounded-lg bg-card border border-border text-foreground text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Role Description */}
          <div className="space-y-1">
            <label className="font-medium text-foreground">Role Overview &amp; Learning Goals</label>
            <textarea
              rows={3}
              placeholder="Describe what the candidate will work on and learn..."
              value={formData.full_description}
              onChange={(e) => setFormData((p) => ({ ...p, full_description: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition resize-none"
            />
          </div>

          {/* Convenient Textareas: One bullet per line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-foreground flex items-center justify-between">
                <span>Key Responsibilities</span>
                <span className="text-[10px] text-muted-foreground">1 bullet per line</span>
              </label>
              <textarea
                rows={4}
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                placeholder="Build responsive UI components&#10;Write clean Next.js code&#10;Collaborate in code reviews"
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition resize-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-foreground flex items-center justify-between">
                <span>Requirements &amp; Qualifications</span>
                <span className="text-[10px] text-muted-foreground">1 bullet per line</span>
              </label>
              <textarea
                rows={4}
                value={qualificationsText}
                onChange={(e) => setQualificationsText(e.target.value)}
                placeholder="JavaScript and React knowledge&#10;Familiarity with Tailwind CSS&#10;Eager to learn production workflows"
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition resize-none font-mono"
              />
            </div>
          </div>

          {/* KPI Management with 1-click presets */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-primary uppercase tracking-wider block">
                  KPI Targets &amp; Weighting
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Load preset or customize. Total weight must equal 100%.
                </span>
              </div>

              {/* 1-Click Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">Presets:</span>
                {Object.keys(KPI_PRESETS).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleLoadKpiPreset(preset)}
                    className="px-2 py-0.5 rounded text-[11px] bg-secondary border border-border hover:border-primary/40 text-foreground transition"
                  >
                    {preset.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Total weight warning */}
            {hasKpiWeights && (
              <div
                className={`px-3 py-1.5 rounded-lg border flex items-center justify-between text-xs ${
                  totalKpiWeight === 100
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-destructive/10 border-destructive/30 text-destructive'
                }`}
              >
                <span>Weight Total: <strong>{totalKpiWeight}%</strong></span>
                {totalKpiWeight !== 100 && (
                  <span className="text-[11px]">Must equal 100% to publish</span>
                )}
              </div>
            )}

            {/* KPI Items */}
            <div className="space-y-2">
              {formData.kpis.map((kpi, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-secondary/30 border border-border flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Goal"
                    value={kpi.title}
                    onChange={(e) => handleUpdateKpi(idx, 'title', e.target.value)}
                    className="flex-1 px-2.5 py-1 rounded bg-card border border-border text-foreground text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Target"
                    value={kpi.target || ''}
                    onChange={(e) => handleUpdateKpi(idx, 'target', e.target.value)}
                    className="w-36 px-2.5 py-1 rounded bg-card border border-border text-foreground text-xs"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={kpi.weight || 0}
                      onChange={(e) => handleUpdateKpi(idx, 'weight', Number(e.target.value))}
                      className="w-14 px-1.5 py-1 rounded bg-card border border-border text-foreground text-xs text-center"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveKpi(idx)}
                    className="text-muted-foreground hover:text-destructive p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddKpi}
                className="w-full text-xs border-dashed"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add KPI Goal
              </Button>
            </div>
          </div>

          {/* Deadline & Publication Controls */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <label className="font-medium text-foreground">Application Deadline (PKT) *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    required
                    value={formData.application_deadline}
                    onChange={(e) => setFormData((p) => ({ ...p, application_deadline: e.target.value }))}
                    className="px-2.5 py-1 rounded-lg bg-secondary/50 border border-border text-foreground text-xs"
                  />
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setQuickDeadline(14)}
                      className="px-2 py-0.5 rounded text-[10px] bg-secondary border border-border text-muted-foreground hover:text-foreground"
                    >
                      +14d
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickDeadline(30)}
                      className="px-2 py-0.5 rounded text-[10px] bg-secondary border border-border text-muted-foreground hover:text-foreground"
                    >
                      +30d
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickDeadline(60)}
                      className="px-2 py-0.5 rounded text-[10px] bg-secondary border border-border text-muted-foreground hover:text-foreground"
                    >
                      +60d
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Status</label>
                  <select
                    value={formData.recruitment_status}
                    onChange={(e) => setFormData((p) => ({ ...p, recruitment_status: e.target.value }))}
                    className="px-2.5 py-1 rounded-lg bg-secondary/50 border border-border text-foreground text-xs"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-foreground">Visibility</label>
                  <select
                    value={formData.publication_status}
                    onChange={(e) => setFormData((p) => ({ ...p, publication_status: e.target.value }))}
                    className="px-2.5 py-1 rounded-lg bg-secondary/50 border border-border text-foreground text-xs"
                  >
                    <option value="Unpublished">Unpublished</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Advanced Settings */}
          <div className="pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              <span>{showAdvanced ? 'Hide Advanced Options' : '+ Show Advanced Options (Custom questions, CV requirement)'}</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvanced && (
              <div className="mt-3 p-3.5 rounded-xl bg-secondary/20 border border-border space-y-3">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.require_cv}
                      onChange={(e) => setFormData((p) => ({ ...p, require_cv: e.target.checked }))}
                      className="rounded accent-primary"
                    />
                    <span>Require CV upload</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.require_portfolio}
                      onChange={(e) => setFormData((p) => ({ ...p, require_portfolio: e.target.checked }))}
                      className="rounded accent-primary"
                    />
                    <span>Require Portfolio Link</span>
                  </label>
                </div>

                {/* Custom Question */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="font-medium text-foreground">Custom Role Question</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a question for applicants..."
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="flex-1 px-2.5 py-1 rounded bg-card border border-border text-xs text-foreground"
                    />
                    <Button type="button" size="sm" onClick={handleAddQuestion} className="text-xs">
                      Add Question
                    </Button>
                  </div>
                  {formData.custom_questions.map((q) => (
                    <div key={q.id} className="flex items-center justify-between p-2 rounded bg-card border border-border">
                      <span>{q.question}</span>
                      <button type="button" onClick={() => handleRemoveQuestion(q.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewOpen(true)}
              className="text-xs"
            >
              <Eye className="w-3.5 h-3.5 mr-1" /> Preview
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSaveAsTemplate}
              className="text-xs"
            >
              <Bookmark className="w-3.5 h-3.5 mr-1" /> Save as Template
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={saving} className="text-xs">
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={saving}
              onClick={() => handleSave(false)}
              className="text-xs"
            >
              Save Draft
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={saving}
              onClick={() => handleSave(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
              Publish Now
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <JobDetailsModal
          job={{
            ...formData,
            responsibilities: responsibilitiesText.split('\n').filter(Boolean),
            required_qualifications: qualificationsText.split('\n').filter(Boolean),
            candidate_benefits: benefitsText.split('\n').filter(Boolean),
            formatted_deadline: `${formData.application_deadline} (PKT)`,
            is_active: true,
          }}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onApply={() => toast.info('Preview mode.')}
        />
      )}
    </div>
  );
}
