'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  Plus,
  Search,
  Copy,
  Edit,
  Trash2,
  LogOut,
  ChevronRight,
  Bookmark,
  Loader2,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { OpeningEditorModal } from '@/components/admin/OpeningEditorModal';
import { ApplicationDetailDrawer } from '@/components/admin/ApplicationDetailDrawer';
import { toast } from 'sonner';

export default function CareersAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Active Tab: 'openings' | 'applications' | 'templates'
  const [activeTab, setActiveTab] = useState('openings');

  // Data states
  const [stats, setStats] = useState(null);
  const [openings, setOpenings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Application filters
  const [appJobFilter, setAppJobFilter] = useState('all');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [appSearch, setAppSearch] = useState('');

  // Modals state
  const [editorOpening, setEditorOpening] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);

  useEffect(() => {
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      setCheckingAuth(true);
      const res = await fetch('/api/admin/auth/check');
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setIsAuthenticated(true);
        setAdminUsername(data.username || 'admin');
        fetchAllDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      toast.success('Signed out.');
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllDashboardData = async () => {
    try {
      setLoadingData(true);
      const [statsRes, openingsRes, appsRes, tmplRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/openings'),
        fetch(`/api/admin/applications?jobId=${appJobFilter}&status=${appStatusFilter}&search=${encodeURIComponent(appSearch)}`),
        fetch('/api/admin/templates'),
      ]);

      const [statsData, openingsData, appsData, tmplData] = await Promise.all([
        statsRes.json(),
        openingsRes.json(),
        appsRes.json(),
        tmplRes.json(),
      ]);

      if (statsData.ok) setStats(statsData.data);
      if (openingsData.ok) setOpenings(openingsData.data || []);
      if (appsData.ok) setApplications(appsData.data || []);
      if (tmplData.ok) setTemplates(tmplData.data || []);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFilteredApplications();
    }
  }, [appJobFilter, appStatusFilter]);

  const fetchFilteredApplications = async () => {
    try {
      const res = await fetch(
        `/api/admin/applications?jobId=${appJobFilter}&status=${appStatusFilter}&search=${encodeURIComponent(appSearch)}`
      );
      const data = await res.json();
      if (data.ok) {
        setApplications(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDuplicateOpening = async (openingId) => {
    try {
      const res = await fetch(`/api/admin/openings/${openingId}/duplicate`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to duplicate');

      toast.success('Opening duplicated as Draft.');
      fetchAllDashboardData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleStatus = async (openingId, currentStatus, type) => {
    try {
      const payload = {};
      if (type === 'recruitment') {
        payload.recruitment_status = currentStatus === 'Open' ? 'Closed' : 'Open';
      } else {
        payload.publication_status = currentStatus === 'Published' ? 'Unpublished' : 'Published';
      }

      const res = await fetch(`/api/admin/openings/${openingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to update status');

      toast.success('Status updated.');
      fetchAllDashboardData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteOpening = async (openingId, title) => {
    if (!confirm(`Permanently delete "${title}" and all its applications?`)) return;

    try {
      const res = await fetch(`/api/admin/openings/${openingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to delete');

      toast.success('Deleted.');
      fetchAllDashboardData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteTemplate = async (tmplId) => {
    if (!confirm('Delete this template?')) return;
    try {
      const res = await fetch(`/api/admin/templates/${tmplId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to delete template');

      toast.success('Template deleted.');
      fetchAllDashboardData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-2">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-xs text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(user) => {
          setIsAuthenticated(true);
          setAdminUsername(user);
          fetchAllDashboardData();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/assets/jt-logo-letters.png" alt="JelTech" className="h-6 w-auto" />
              <span className="text-sm font-bold tracking-tight text-foreground">
                Jel<span className="text-primary">Tech</span>
              </span>
            </Link>
            <span className="text-xs text-muted-foreground border-l border-border pl-3">
              Careers Admin
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/careers"
              target="_blank"
              className="hidden sm:flex items-center gap-1 text-muted-foreground hover:text-primary transition"
            >
              <span>View /careers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={fetchAllDashboardData}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <span className="text-muted-foreground hidden sm:inline">{adminUsername}</span>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive transition"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-6 flex gap-6 text-xs font-medium border-t border-border">
          {[
            { id: 'openings', label: `Openings (${openings.length})` },
            { id: 'applications', label: `Applications (${stats?.applications?.total ?? applications.length})` },
            { id: 'templates', label: `Templates (${templates.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-6 space-y-6">
        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-card border border-border">
            <span className="text-[11px] text-muted-foreground block">Open Roles</span>
            <span className="text-xl font-bold text-primary">{stats?.openings?.open ?? 0}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-card border border-border">
            <span className="text-[11px] text-muted-foreground block">Draft Roles</span>
            <span className="text-xl font-bold text-foreground">{stats?.openings?.draft ?? 0}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-card border border-border">
            <span className="text-[11px] text-muted-foreground block">Total Candidates</span>
            <span className="text-xl font-bold text-foreground">{stats?.applications?.total ?? 0}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-card border border-border">
            <span className="text-[11px] text-muted-foreground block">New Submissions</span>
            <span className="text-xl font-bold text-primary">{stats?.applications?.new ?? 0}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-card border border-border">
            <span className="text-[11px] text-muted-foreground block">Under Review</span>
            <span className="text-xl font-bold text-foreground">{stats?.applications?.under_review ?? 0}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-card border border-border">
            <span className="text-[11px] text-muted-foreground block">Shortlisted</span>
            <span className="text-xl font-bold text-primary">{stats?.applications?.shortlisted ?? 0}</span>
          </div>
        </div>

        {activeTab === 'openings' ? (
          /* TAB 1: JOB OPENINGS */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Recruitment Positions</h2>
                <p className="text-xs text-muted-foreground">Manage active, draft, and closed positions</p>
              </div>

              <Button
                size="sm"
                onClick={() => {
                  setEditorOpening(null);
                  setIsEditorOpen(true);
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Create Opening
              </Button>
            </div>

            <div className="space-y-2.5">
              {openings.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-foreground">{job.title}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {job.department}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                        {job.employment_type}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                        {job.work_mode}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
                      <span>{job.location}</span>
                      <span>{job.working_hours}</span>
                      <span>Deadline: {job.formatted_deadline}</span>
                      <span>{job.application_count} candidates</span>
                    </div>
                  </div>

                  {/* Actions & Status Toggles */}
                  <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-border">
                    <button
                      onClick={() => handleToggleStatus(job.id, job.recruitment_status, 'recruitment')}
                      className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
                        job.recruitment_status === 'Open'
                          ? 'bg-primary/10 text-primary border-primary/30'
                          : 'bg-secondary text-muted-foreground border-border'
                      }`}
                      title="Toggle Open/Closed"
                    >
                      {job.recruitment_status}
                    </button>

                    <button
                      onClick={() => handleToggleStatus(job.id, job.publication_status, 'publication')}
                      className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
                        job.publication_status === 'Published'
                          ? 'bg-primary/20 text-primary border-primary/40'
                          : 'bg-secondary text-muted-foreground border-border'
                      }`}
                      title="Toggle Published/Unpublished"
                    >
                      {job.publication_status}
                    </button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditorOpening(job);
                        setIsEditorOpen(true);
                      }}
                      className="text-xs h-7"
                    >
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDuplicateOpening(job.id)}
                      className="text-xs h-7"
                      title="Duplicate opening"
                    >
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteOpening(job.id, job.title)}
                      className="text-xs h-7 text-muted-foreground hover:text-destructive p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'applications' ? (
          /* TAB 2: APPLICATIONS */
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-foreground">Candidate Submissions</h2>
                <p className="text-xs text-muted-foreground">Review portfolios, internal notes, and scores</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="relative w-44">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search candidate..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') fetchFilteredApplications();
                    }}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                <select
                  value={appJobFilter}
                  onChange={(e) => setAppJobFilter(e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs focus:outline-none focus:border-primary"
                >
                  <option value="all">All Roles</option>
                  {openings.map((j) => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>

                <select
                  value={appStatusFilter}
                  onChange={(e) => setAppStatusFilter(e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs focus:outline-none focus:border-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Applications Table */}
            <div className="rounded-xl bg-card border border-border overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-secondary/40 border-b border-border text-muted-foreground font-semibold">
                  <tr>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Education</th>
                    <th className="p-3">Submitted</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <tr
                        key={app.id}
                        onClick={() => {
                          setSelectedAppId(app.id);
                          setIsAppDrawerOpen(true);
                        }}
                        className="hover:bg-secondary/20 transition cursor-pointer"
                      >
                        <td className="p-3 font-semibold text-foreground">
                          {app.full_name}
                          {app.resume_filename && (
                            <span className="block text-[10px] text-primary mt-0.5">&#128206; CV Attached</span>
                          )}
                        </td>
                        <td className="p-3 text-foreground">{app.job_title}</td>
                        <td className="p-3 text-muted-foreground">
                          {app.education_status}
                          {app.qualification ? ` &bull; ${app.qualification}` : ''}
                        </td>
                        <td className="p-3 text-muted-foreground">{app.formatted_created_at}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                              app.status === 'New'
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : app.status === 'Shortlisted'
                                ? 'bg-primary/20 text-primary border-primary/40'
                                : 'bg-secondary text-muted-foreground border-border'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="text-primary hover:underline">&rarr;</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-muted-foreground italic">
                        No applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* TAB 3: TEMPLATES */
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Saved Reusable Templates</h2>
              <p className="text-xs text-muted-foreground">Pre-configured role structures to generate new openings in seconds</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {templates.map((tmpl) => (
                <div key={tmpl.id} className="p-5 rounded-xl bg-card border border-border space-y-3 flex flex-col justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-primary">{tmpl.department}</span>
                      <button
                        onClick={() => handleDeleteTemplate(tmpl.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{tmpl.name}</h3>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">{tmpl.role_description}</p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {tmpl.kpis?.length || 0} KPIs &bull; {tmpl.responsibilities?.length || 0} responsibilities
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditorOpening({
                          title: tmpl.name.replace(/ Template$/i, ''),
                          department: tmpl.department,
                          full_description: tmpl.role_description || '',
                          short_description: tmpl.role_description ? tmpl.role_description.slice(0, 150) + '...' : '',
                          responsibilities: tmpl.responsibilities || [],
                          required_qualifications: tmpl.qualifications || [],
                          candidate_benefits: tmpl.benefits || [],
                          kpis: tmpl.kpis || [],
                          custom_questions: tmpl.custom_questions || [],
                          employment_type: tmpl.working_arrangements?.employmentType || 'Internship',
                          work_mode: tmpl.working_arrangements?.workMode || 'Hybrid',
                          location: tmpl.working_arrangements?.location || 'Karachi, Pakistan / Remote',
                          duration: tmpl.working_arrangements?.duration || '3 months',
                          working_hours: tmpl.working_arrangements?.workingHours || '4 hours per day',
                          is_paid: tmpl.working_arrangements?.isPaid ?? false,
                          stipend_amount: tmpl.working_arrangements?.stipendAmount || '',
                          recruitment_status: 'Draft',
                          publication_status: 'Unpublished',
                        });
                        setIsEditorOpen(true);
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Editor Modal */}
      <OpeningEditorModal
        opening={editorOpening}
        isOpen={isEditorOpen}
        templates={templates}
        onClose={() => {
          setIsEditorOpen(false);
          setEditorOpening(null);
        }}
        onSaved={() => fetchAllDashboardData()}
      />

      {/* Candidate Detail Drawer */}
      <ApplicationDetailDrawer
        applicationId={selectedAppId}
        isOpen={isAppDrawerOpen}
        onClose={() => {
          setIsAppDrawerOpen(false);
          setSelectedAppId(null);
        }}
        onStatusUpdated={() => fetchAllDashboardData()}
      />
    </div>
  );
}
