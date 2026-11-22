'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ApplicationModal } from '@/components/careers/ApplicationModal';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  Code2,
  Users,
  Loader2,
  CheckCircle2,
  Award,
  Target,
  Share2,
  ExternalLink,
  HelpCircle,
  ChevronRight,
  Filter,
  Check,
  Zap,
  ShieldCheck,
  ChevronDown,
  X,
  Building2,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CareersPage() {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected role for the detail panel
  const [selectedJob, setSelectedJob] = useState(null);

  // Active tab within the detail panel: 'overview' | 'requirements' | 'kpis'
  const [activeDetailTab, setActiveDetailTab] = useState('overview');

  // Mobile navigation between list and detail view
  const [mobilePane, setMobilePane] = useState('list'); // 'list' | 'detail'

  // Application modal state
  const [jobToApply, setJobToApply] = useState(null);

  // Candidate Guidance banner toggle
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);

  useEffect(() => {
    fetchOpenings();
  }, []);

  const fetchOpenings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/careers/openings');
      const data = await res.json();
      if (data.ok && Array.isArray(data.data)) {
        setOpenings(data.data);
        if (data.data.length > 0) {
          setSelectedJob(data.data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load openings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Derive unique departments & work modes for filtering
  const departments = useMemo(() => {
    return ['All', ...new Set(openings.map((j) => j.department).filter(Boolean))];
  }, [openings]);

  const workModes = useMemo(() => {
    return ['All', ...new Set(openings.map((j) => j.work_mode).filter(Boolean))];
  }, [openings]);

  // Filtered list
  const filteredOpenings = useMemo(() => {
    return openings.filter((job) => {
      const matchesDept =
        selectedDepartment === 'All' || job.department === selectedDepartment;
      const matchesMode =
        selectedWorkMode === 'All' || job.work_mode === selectedWorkMode;
      const matchesSearch =
        !searchQuery.trim() ||
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesMode && matchesSearch;
    });
  }, [openings, selectedDepartment, selectedWorkMode, searchQuery]);

  // Keep selectedJob in sync if filtered list changes
  useEffect(() => {
    if (filteredOpenings.length > 0) {
      const stillInList = filteredOpenings.some((j) => j.id === selectedJob?.id);
      if (!stillInList) {
        setSelectedJob(filteredOpenings[0]);
      }
    } else {
      setSelectedJob(null);
    }
  }, [filteredOpenings, selectedJob]);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setActiveDetailTab('overview');
    setMobilePane('detail');
  };

  const handleShare = (job) => {
    if (!job) return;
    const url = `${window.location.origin}/careers/${job.slug || job.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const clearFilters = () => {
    setSelectedDepartment('All');
    setSelectedWorkMode('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* TOP HERO & APPLICANT GUIDANCE SECTION */}
        <section className="relative pt-8 pb-10 border-b border-border/80 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>JelTech Talent Portal</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-foreground/80 font-normal">
                    {loading ? 'Loading roles...' : `${openings.length} Active Openings`}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                  Join Our Team. <span className="text-primary">Ship Real Impact.</span>
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Browse open positions below. Select any role from the left panel to review expectations, responsibilities, mentorship benefits, and transparent KPIs before applying.
                </p>
              </div>

              {/* Guidance Toggle Button & Highlights */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsGuidanceOpen((prev) => !prev)}
                  className={`inline-flex items-center justify-between sm:justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    isGuidanceOpen
                      ? 'bg-primary/15 border-primary/40 text-primary shadow-sm'
                      : 'bg-card border-border text-foreground hover:border-primary/40'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    How Hiring Works &amp; Guidance
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isGuidanceOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* EXPANDABLE HIRING GUIDANCE PANEL */}
            {isGuidanceOpen && (
              <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-card border border-primary/25 shadow-lg space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-foreground">
                        Candidate Guidance &amp; Selection Process
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Everything you need to know about preparing your application
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsGuidanceOpen(false)}
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground text-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 3 Step Guidance Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/40 border border-border space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <h3 className="text-xs font-bold text-foreground">
                        Select &amp; Inspect Panel
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Click any role on the left directory. The detail panel reveals the complete job description, weekly hours (typically flexible 20-25 hrs), and location options.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/40 border border-border space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <h3 className="text-xs font-bold text-foreground">
                        Transparent KPI Criteria
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We share our evaluation metrics upfront under the <strong>Growth &amp; KPIs</strong> tab. You will know exactly how weekly progress and code quality are assessed.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/40 border border-border space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <h3 className="text-xs font-bold text-foreground">
                        Streamlined 3-Min Form
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      No tedious account creation. Submit your contact details, student status, and portfolio/resume. Our founders review applications within 48 to 72 hours.
                    </p>
                  </div>
                </div>

                {/* Quick FAQs */}
                <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5 text-foreground/90">
                      <Check className="w-3.5 h-3.5 text-primary" /> Students &amp; freshers welcome
                    </span>
                    <span className="flex items-center gap-1.5 text-foreground/90">
                      <Check className="w-3.5 h-3.5 text-primary" /> Flexible study-compatible hours
                    </span>
                    <span className="flex items-center gap-1.5 text-foreground/90">
                      <Check className="w-3.5 h-3.5 text-primary" /> Pathway to junior full-time roles
                    </span>
                  </div>
                  <button
                    onClick={() => setIsGuidanceOpen(false)}
                    className="text-primary hover:underline font-semibold"
                  >
                    Got it, continue browsing &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* DUAL-PANEL CAREERS WORKSPACE */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl mt-8">
          {/* Mobile Tab Switcher (Visible only on < lg) */}
          <div className="lg:hidden flex items-center p-1 rounded-xl bg-card border border-border mb-4">
            <button
              onClick={() => setMobilePane('list')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mobilePane === 'list'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Positions ({filteredOpenings.length})</span>
            </button>
            <button
              onClick={() => {
                if (selectedJob) setMobilePane('detail');
              }}
              disabled={!selectedJob}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mobilePane === 'detail'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground disabled:opacity-40'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Role Details</span>
            </button>
          </div>

          {/* MAIN DUAL PANELS CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT PANEL: FILTERS & OPENINGS DIRECTORY (5 cols on lg) */}
            <div
              className={`lg:col-span-5 flex flex-col space-y-4 ${
                mobilePane === 'detail' ? 'hidden lg:flex' : 'flex'
              }`}
            >
              {/* Filter Panel Card */}
              <div className="p-4 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
                {/* Search Box */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by title, skill, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Pills: Department */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold uppercase tracking-wider">Department</span>
                    <span>{departments.length > 1 ? `${departments.length - 1} areas` : ''}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => setSelectedDepartment(dept)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                          selectedDepartment === dept
                            ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                            : 'bg-secondary/40 border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/30'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Pills: Work Mode */}
                <div className="space-y-1.5 pt-2 border-t border-border/60">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold uppercase tracking-wider">Work Mode</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {workModes.map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSelectedWorkMode(mode)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                          selectedWorkMode === mode
                            ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                            : 'bg-secondary/40 border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/30'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter summary bar */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground border-t border-border/60">
                  <span>
                    Showing <strong className="text-foreground">{filteredOpenings.length}</strong> of{' '}
                    {openings.length} roles
                  </span>
                  {(selectedDepartment !== 'All' ||
                    selectedWorkMode !== 'All' ||
                    searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="text-primary hover:underline font-semibold"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>

              {/* Openings Cards List */}
              <div className="space-y-3">
                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center space-y-3 p-8 rounded-2xl bg-card border border-border text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <p className="text-xs text-muted-foreground">Loading available positions...</p>
                  </div>
                ) : filteredOpenings.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">No Positions Found</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      No roles match your current search and filter settings. Try adjusting the department or clearing your query.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs mt-2"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  filteredOpenings.map((job) => {
                    const isSelected = selectedJob?.id === job.id;
                    return (
                      <div
                        key={job.id}
                        onClick={() => handleSelectJob(job)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative group text-left ${
                          isSelected
                            ? 'bg-primary/[0.06] border-primary ring-1 ring-primary/40 shadow-md'
                            : 'bg-card border-border hover:border-primary/40 hover:bg-card/90'
                        }`}
                      >
                        {/* Top tag row */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                              {job.department}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                              {job.work_mode}
                            </span>
                          </div>

                          {job.is_paid && (
                            <span className="text-[11px] font-semibold text-primary flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {job.stipend_amount ? 'Paid' : 'Paid Role'}
                            </span>
                          )}
                        </div>

                        {/* Title & Short snippet */}
                        <div className="space-y-1">
                          <h3
                            className={`text-base font-bold transition-colors line-clamp-1 ${
                              isSelected
                                ? 'text-primary'
                                : 'text-foreground group-hover:text-primary'
                            }`}
                          >
                            {job.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {job.short_description}
                          </p>
                        </div>

                        {/* Meta items */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground pt-3 mt-3 border-t border-border/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            {job.location?.split('/')[0]?.trim() || job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-primary" />
                            {job.working_hours}
                          </span>
                          <span className="flex items-center gap-1 ml-auto font-medium text-foreground/80">
                            Deadline: {job.formatted_deadline?.split(',')[0]}
                          </span>
                        </div>

                        {/* Visual indicator arrow */}
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden lg:flex items-center">
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected
                                ? 'text-primary translate-x-1'
                                : 'text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT PANEL: SELECTED ROLE DETAIL WORKSPACE (7 cols on lg) */}
            <div
              className={`lg:col-span-7 ${
                mobilePane === 'list' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* Mobile Back Button */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobilePane('list')}
                  className="text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to open positions
                </Button>
              </div>

              {!selectedJob ? (
                <div className="p-12 rounded-2xl bg-card border border-border text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    Select a Role to View Details
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Choose any position from the left panel to inspect responsibilities, qualifications, and KPIs.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl bg-card border border-border shadow-xl overflow-hidden flex flex-col">
                  {/* PANEL HEADER */}
                  <div className="p-6 sm:p-7 border-b border-border bg-gradient-to-b from-secondary/40 to-card space-y-4">
                    {/* Top badging & share */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                          {selectedJob.department}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                          {selectedJob.employment_type}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                          {selectedJob.work_mode}
                        </span>
                        {selectedJob.is_paid && (
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {selectedJob.stipend_amount || 'Paid Stipend'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleShare(selectedJob)}
                          className="p-1.5 rounded-lg border border-border/80 bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition flex items-center gap-1 text-xs"
                          title="Share position link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Share</span>
                        </button>
                        <Link
                          href={`/careers/${selectedJob.slug || selectedJob.id}`}
                          className="p-1.5 rounded-lg border border-border/80 bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition flex items-center gap-1 text-xs"
                          title="Open full page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Full Page</span>
                        </Link>
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <div className="space-y-1.5">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        {selectedJob.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {selectedJob.short_description}
                      </p>
                    </div>

                    {/* Quick Metadata 4-Grid Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-border/60">
                      <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/60">
                        <span className="block text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-0.5">
                          Location
                        </span>
                        <p className="text-xs font-medium text-foreground truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary shrink-0" />
                          {selectedJob.location}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/60">
                        <span className="block text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-0.5">
                          Commitment
                        </span>
                        <p className="text-xs font-medium text-foreground truncate flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary shrink-0" />
                          {selectedJob.working_hours}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/60">
                        <span className="block text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-0.5">
                          Duration
                        </span>
                        <p className="text-xs font-medium text-foreground truncate flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary shrink-0" />
                          {selectedJob.duration || '3 Months'}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/60">
                        <span className="block text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-0.5">
                          Deadline
                        </span>
                        <p className="text-xs font-medium text-foreground truncate flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary shrink-0" />
                          {selectedJob.formatted_deadline?.split(',')[0]}
                        </p>
                      </div>
                    </div>

                    {/* Primary Apply CTA Bar in Header */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        <span>Direct review by leadership &bull; Response within 48-72h</span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => setJobToApply(selectedJob)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold px-6 py-2 shadow-md flex items-center justify-center gap-1.5"
                      >
                        Apply for this Role <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* TAB NAVIGATION INSIDE PANEL */}
                  <div className="px-6 pt-3 border-b border-border bg-card/60 flex items-center gap-2 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setActiveDetailTab('overview')}
                      className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                        activeDetailTab === 'overview'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Overview &amp; Responsibilities
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDetailTab('requirements')}
                      className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                        activeDetailTab === 'requirements'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Requirements &amp; Tech Stack
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDetailTab('kpis')}
                      className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        activeDetailTab === 'kpis'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Target className="w-3.5 h-3.5" />
                      Growth, Benefits &amp; KPIs
                    </button>
                  </div>

                  {/* TAB CONTENT BODY */}
                  <div className="p-6 sm:p-7 space-y-6 flex-1 overflow-y-auto max-h-[600px]">
                    {/* TAB 1: OVERVIEW & RESPONSIBILITIES */}
                    {activeDetailTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Full Description */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5" /> About The Role
                          </h4>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                            {selectedJob.full_description || selectedJob.short_description}
                          </p>
                        </div>

                        {/* Working Arrangements Card */}
                        <div className="p-4 rounded-xl bg-secondary/30 border border-border/70 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                            Arrangements &amp; Schedule
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground block text-[11px]">
                                Schedule Format
                              </span>
                              <span className="text-foreground font-medium">
                                {selectedJob.working_schedule || 'Flexible schedule compatible with studies'}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block text-[11px]">
                                Reporting To
                              </span>
                              <span className="text-foreground font-medium">
                                {selectedJob.reporting_manager || 'Senior Technical Lead'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Responsibilities list */}
                        {selectedJob.responsibilities &&
                          selectedJob.responsibilities.length > 0 && (
                            <div className="space-y-3 pt-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                                Key Responsibilities (What You Will Do)
                              </h4>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90">
                                {selectedJob.responsibilities.map((r, i) => (
                                  <li key={i} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}

                    {/* TAB 2: REQUIREMENTS & QUALIFICATIONS */}
                    {activeDetailTab === 'requirements' && (
                      <div className="space-y-6">
                        {/* Required Qualifications */}
                        {selectedJob.required_qualifications &&
                          selectedJob.required_qualifications.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                                Required Qualifications &amp; Skills
                              </h4>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90">
                                {selectedJob.required_qualifications.map((q, i) => (
                                  <li key={i} className="flex items-start gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                    <span className="leading-relaxed">{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Preferred Qualifications */}
                        {selectedJob.preferred_qualifications &&
                          selectedJob.preferred_qualifications.length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-border/60">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                                Preferred / Nice to Have
                              </h4>
                              <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90">
                                {selectedJob.preferred_qualifications.map((p, i) => (
                                  <li key={i} className="flex items-start gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-muted-foreground/60 shrink-0 mt-1.5" />
                                    <span className="leading-relaxed">{p}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Application Checklist Guidance */}
                        <div className="p-4 rounded-xl bg-secondary/30 border border-border/70 space-y-2 text-xs">
                          <h4 className="font-bold text-foreground flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" /> Application Readiness
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Have your GitHub, portfolio, or sample projects ready. You do not need years of prior corporate experience—we value demonstrable curiosity, clean fundamental coding habits, and readiness to learn fast.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: GROWTH, BENEFITS & KPIS */}
                    {activeDetailTab === 'kpis' && (
                      <div className="space-y-6">
                        {/* Candidate Benefits */}
                        {selectedJob.candidate_benefits &&
                          selectedJob.candidate_benefits.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                                <Award className="w-4 h-4" /> What You Will Gain &amp; Learn
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                {selectedJob.candidate_benefits.map((b, i) => (
                                  <div
                                    key={i}
                                    className="p-3 rounded-xl bg-secondary/40 border border-border/70 text-foreground/90 flex items-start gap-2.5"
                                  >
                                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{b}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* KPI Evaluation Matrix */}
                        {selectedJob.kpis && selectedJob.kpis.length > 0 && (
                          <div className="space-y-3 pt-4 border-t border-border/60">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                                <Target className="w-4 h-4" /> Transparent KPI Evaluation Matrix
                              </h4>
                              <span className="text-[11px] text-muted-foreground">
                                Clear weekly benchmarks
                              </span>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed">
                              At JelTech, internships are structured. Here is how your mentorship reviews and performance bonuses are measured:
                            </p>

                            <div className="space-y-2.5 text-xs">
                              {selectedJob.kpis.map((kpi, i) => (
                                <div
                                  key={i}
                                  className="p-3.5 rounded-xl bg-secondary/30 border border-border/80 space-y-1.5"
                                >
                                  <div className="flex items-center justify-between font-bold text-foreground">
                                    <span className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                      {kpi.title}
                                    </span>
                                    {kpi.weight ? (
                                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-semibold text-[11px] border border-primary/20">
                                        {kpi.weight}% Weight
                                      </span>
                                    ) : null}
                                  </div>
                                  {kpi.explanation && (
                                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                                      {kpi.explanation}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                                    {kpi.target && (
                                      <span>
                                        Target: <strong className="text-foreground">{kpi.target}</strong>
                                      </span>
                                    )}
                                    {kpi.measurementMethod && (
                                      <span>
                                        Method: <strong>{kpi.measurementMethod}</strong>
                                      </span>
                                    )}
                                    {kpi.frequency && (
                                      <span>
                                        Cadence: <strong>{kpi.frequency}</strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* PANEL FOOTER CTA */}
                  <div className="p-4 sm:p-5 border-t border-border bg-gradient-to-t from-secondary/40 to-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Ready to apply for {selectedJob.title}?
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Application closes on {selectedJob.formatted_deadline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setJobToApply(selectedJob)}
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold px-6 py-2 shadow-md flex items-center justify-center gap-1.5"
                      >
                        Start Application <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* WORK CULTURE HIGHLIGHTS STRIP */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl mt-16 pt-12 border-t border-border/60">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-primary text-xs font-semibold tracking-wider uppercase block">
              Why Engineers &amp; Creators Choose JelTech
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Built for Learning, Engineering &amp; Real Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Production Experience</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Work directly on client codebases, next-gen digital canvases, and live web apps from your first sprint.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">1-on-1 Founder Mentorship</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive weekly code reviews, architectural feedback, and clear roadmap milestones tailored to your growth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Fast-Track Full-Time Path</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Top internship performers transition directly into permanent junior full-time roles with competitive compensation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* APPLICATION MODAL */}
      <ApplicationModal
        job={jobToApply}
        isOpen={Boolean(jobToApply)}
        onClose={() => setJobToApply(null)}
      />
    </div>
  );
}
