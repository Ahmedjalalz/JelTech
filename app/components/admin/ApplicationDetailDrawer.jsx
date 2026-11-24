'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  User,
  GraduationCap,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  MessageSquare,
  Award,
  History,
  Loader2,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const STATUS_OPTIONS = [
  'New',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Selected',
  'Rejected',
  'Withdrawn',
];

export function ApplicationDetailDrawer({ applicationId, isOpen, onClose, onStatusUpdated }) {
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  // Notes state
  const [noteContent, setNoteContent] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // Evaluation state
  const [evaluation, setEvaluation] = useState({
    score_skills: 0,
    score_communication: 0,
    score_creativity: 0,
    score_learning: 0,
    score_overall: 0,
    notes: '',
  });
  const [savingEval, setSavingEval] = useState(false);

  function getAuthHeaders(extra = {}) {
    const headers = { ...extra };
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('jeltech_admin_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  useEffect(() => {
    if (applicationId && isOpen) {
      loadApplicationDetails();
    }
  }, [applicationId, isOpen]);

  const loadApplicationDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/applications/${applicationId}`, {
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Failed to load details.');
      }
      setApp(json.data);
      if (json.data.evaluation) {
        setEvaluation({
          score_skills: json.data.evaluation.score_skills || 0,
          score_communication: json.data.evaluation.score_communication || 0,
          score_creativity: json.data.evaluation.score_creativity || 0,
          score_learning: json.data.evaluation.score_learning || 0,
          score_overall: json.data.evaluation.score_overall || 0,
          notes: json.data.evaluation.notes || '',
        });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to update status');

      toast.success(`Status updated: ${newStatus}`);
      setApp((prev) => ({ ...prev, status: newStatus }));
      loadApplicationDetails();
      if (onStatusUpdated) onStatusUpdated();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    try {
      setSavingNote(true);
      const res = await fetch(`/api/admin/applications/${applicationId}/notes`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ note_type: 'internal', content: noteContent }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to add note');

      toast.success('Note added.');
      setNoteContent('');
      loadApplicationDetails();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingNote(false);
    }
  };

  const handleSaveEvaluation = async (e) => {
    e.preventDefault();
    try {
      setSavingEval(true);
      const res = await fetch(`/api/admin/applications/${applicationId}/evaluation`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(evaluation),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to save evaluation');

      toast.success('Scores saved.');
      loadApplicationDetails();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingEval(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden bg-background/80 backdrop-blur-sm text-foreground">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-xl h-full bg-card border-l border-border shadow-2xl flex flex-col z-10"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-border bg-secondary/30 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {app?.job_title}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {app?.full_name || 'Candidate'}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Applied {app?.formatted_created_at}
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

        {/* Status Bar */}
        <div className="px-6 py-2.5 bg-secondary/20 border-b border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
              {app?.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Change:</span>
            <select
              value={app?.status || ''}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-xs px-2 py-1 rounded bg-secondary border border-border text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-border bg-card flex gap-4 text-xs font-medium">
          {[
            { id: 'profile', label: 'Candidate', icon: User },
            { id: 'notes', label: `Notes (${app?.notes?.length || 0})`, icon: MessageSquare },
            { id: 'evaluation', label: 'Scores (1-10)', icon: Award },
            { id: 'activity', label: 'Audit Log', icon: History },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
                activeTab === tab.id
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading details...</p>
            </div>
          ) : activeTab === 'profile' ? (
            /* CANDIDATE PROFILE */
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-secondary/30 border border-border space-y-2">
                <span className="font-semibold text-primary uppercase tracking-wider block">Contact</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground block">Email:</span>
                    <a href={`mailto:${app.email}`} className="text-foreground hover:text-primary font-medium">{app.email}</a>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Phone / WhatsApp:</span>
                    <a href={`https://wa.me/${app.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary font-medium">{app.phone}</a>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-secondary/30 border border-border space-y-2">
                <span className="font-semibold text-primary uppercase tracking-wider block flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" /> Education
                </span>
                <p className="font-medium text-foreground">{app.education_status}</p>
                {(app.qualification || app.institution) && (
                  <p className="text-muted-foreground">
                    {app.qualification} {app.institution ? `(${app.institution})` : ''}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-secondary/30 border border-border space-y-1">
                  <span className="font-semibold text-muted-foreground uppercase block">Relevant Skills</span>
                  <p className="font-medium text-foreground">{app.relevant_skills}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-secondary/30 border border-border space-y-1">
                  <span className="font-semibold text-muted-foreground uppercase block">Why Interested</span>
                  <p className="text-foreground/90 whitespace-pre-line leading-relaxed">{app.why_interested}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-secondary/30 border border-border space-y-1">
                  <span className="font-semibold text-muted-foreground uppercase block">Why Consider</span>
                  <p className="text-foreground/90 whitespace-pre-line leading-relaxed">{app.why_consider}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-secondary/30 border border-border space-y-1">
                  <span className="font-semibold text-muted-foreground uppercase block">Weekly Availability</span>
                  <p className="font-medium text-foreground">{app.weekly_availability}</p>
                </div>

                {app.additional_info && (
                  <div className="p-3.5 rounded-xl bg-secondary/30 border border-border space-y-1">
                    <span className="font-semibold text-muted-foreground uppercase block">Additional Information</span>
                    <p className="text-foreground/90 whitespace-pre-line">{app.additional_info}</p>
                  </div>
                )}
              </div>

              {/* Profiles & Links */}
              <div className="flex flex-wrap gap-2 pt-1">
                {app.portfolio_url && (
                  <a href={app.portfolio_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/40 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-primary" /> Portfolio
                  </a>
                )}
                {app.github_url && (
                  <a href={app.github_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/40 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-primary" /> GitHub
                  </a>
                )}
                {app.linkedin_url && (
                  <a href={app.linkedin_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/40 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-primary" /> LinkedIn
                  </a>
                )}
              </div>

              {/* Resume download */}
              {app.resume_file_id && (
                <div className="p-3 rounded-xl bg-secondary/30 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>{app.resume_filename || 'Candidate_Resume.pdf'}</span>
                  </div>
                  <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                    <a href={`/api/admin/resumes/${app.resume_file_id}`} download>
                      <Download className="w-3.5 h-3.5 mr-1" /> Download
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ) : activeTab === 'notes' ? (
            /* INTERNAL NOTES */
            <div className="space-y-4">
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Add private note or interview observation..."
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary transition resize-none"
                />
                <div className="flex justify-end">
                  <Button type="submit" size="sm" disabled={savingNote} className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                    {savingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Send className="w-3.5 h-3.5 mr-1" />}
                    Add Note
                  </Button>
                </div>
              </form>

              <div className="space-y-2 pt-2 border-t border-border">
                {app.notes && app.notes.length > 0 ? (
                  app.notes.map((n) => (
                    <div key={n.id} className="p-3 rounded-lg bg-secondary/30 border border-border space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="font-semibold text-primary">{n.author}</span>
                        <span>{n.formatted_created_at}</span>
                      </div>
                      <p className="text-foreground/90 whitespace-pre-line">{n.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground italic text-center py-4">No internal notes yet.</p>
                )}
              </div>
            </div>
          ) : activeTab === 'evaluation' ? (
            /* CANDIDATE SCORING (1-10) */
            <form onSubmit={handleSaveEvaluation} className="space-y-4">
              {[
                { key: 'score_skills', label: 'Technical / Domain Skills' },
                { key: 'score_communication', label: 'Communication' },
                { key: 'score_creativity', label: 'Creativity / Problem Solving' },
                { key: 'score_learning', label: 'Learning Agility' },
                { key: 'score_overall', label: 'Overall Impression' },
              ].map(({ key, label }) => (
                <div key={key} className="p-3 rounded-xl bg-secondary/30 border border-border space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="font-bold text-primary">{evaluation[key]} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={evaluation[key]}
                    onChange={(e) => setEvaluation((p) => ({ ...p, [key]: Number(e.target.value) }))}
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label className="font-medium text-foreground">Evaluator Notes</label>
                <textarea
                  rows={2}
                  value={evaluation.notes}
                  onChange={(e) => setEvaluation((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Evaluation summary..."
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-xs focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <Button type="submit" disabled={savingEval} size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                {savingEval ? 'Saving...' : 'Save Candidate Scores'}
              </Button>
            </form>
          ) : (
            /* ACTIVITY LOG */
            <div className="space-y-2">
              {app.activity && app.activity.length > 0 ? (
                app.activity.map((act) => (
                  <div key={act.id} className="p-2.5 rounded-lg bg-secondary/30 border border-border text-xs flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{act.action}</p>
                      <p className="text-[10px] text-muted-foreground">By {act.actor}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{act.formatted_created_at}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground italic text-center py-4">No activity logged.</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
