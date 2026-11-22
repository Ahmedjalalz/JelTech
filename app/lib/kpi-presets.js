export const KPI_PRESETS = {
  'SEO & Growth': [
    { title: 'Task Completion', explanation: 'Execution of assigned weekly SEO audits, keyword clusters, and content refreshes on schedule.', target: '95% tasks on-time', measurementMethod: 'Weekly sprint board reviews', frequency: 'Weekly', weight: 20 },
    { title: 'Research Quality', explanation: 'Thorough competitor gap analysis and high-intent keyword clustering.', target: 'Zero missed core intent keywords', measurementMethod: 'Peer review and client ranking reports', frequency: 'Bi-weekly', weight: 20 },
    { title: 'On-Page Optimization', explanation: 'Proper meta tags, schema markup, semantic headings, and internal linking structure.', target: '100% adherence to technical checklist', measurementMethod: 'Lighthouse & ScreamingFrog audits', frequency: 'Weekly', weight: 20 },
    { title: 'Technical SEO Health', explanation: 'Monitoring crawl errors, canonicals, sitemaps, and core web vitals.', target: 'No crawl errors, 90+ mobile CWV', measurementMethod: 'Google Search Console checks', frequency: 'Monthly', weight: 15 },
    { title: 'Reporting & Analytics', explanation: 'Delivering actionable monthly traffic and conversion insight reports.', target: 'Clear insight decks delivered monthly', measurementMethod: 'Client / supervisor review', frequency: 'Monthly', weight: 15 },
    { title: 'Self-Learning & Initiative', explanation: 'Staying current with search algorithm changes and AI search dynamics.', target: '1 documented case study or insight per month', measurementMethod: 'Team knowledge sharing', frequency: 'Monthly', weight: 10 }
  ],
  'Social Media & Marketing': [
    { title: 'Content Production', explanation: 'Creating engaging carousels, video snippets, and case study breakdowns.', target: '3 high-quality posts per week', measurementMethod: 'Content calendar audit', frequency: 'Weekly', weight: 25 },
    { title: 'Creativity & Brand Voice', explanation: 'Adherence to JelTech tone of voice, visual aesthetic, and modern tech appeal.', target: 'Zero off-brand assets released', measurementMethod: 'Creative Director review', frequency: 'Bi-weekly', weight: 20 },
    { title: 'Audience Engagement', explanation: 'Proactive community response, comment management, and tech discussion participation.', target: '< 2 hour response time on comments & DMs', measurementMethod: 'Platform analytics', frequency: 'Weekly', weight: 20 },
    { title: 'Reach & Growth Improvement', explanation: 'Optimizing distribution and hashtags to increase organic impressions and followers.', target: '15% month-over-month growth in engagement', measurementMethod: 'Monthly analytics report', frequency: 'Monthly', weight: 20 },
    { title: 'Planning & Reporting', explanation: 'Maintaining a 2-week advance buffer in scheduling and monthly performance synthesis.', target: '2-week advance buffer maintained', measurementMethod: 'Editorial calendar check', frequency: 'Monthly', weight: 15 }
  ],
  'Web & Software Engineering': [
    { title: 'Feature Delivery', explanation: 'Shipping assigned components, pages, and API handlers to production specifications.', target: '100% of sprint deliverables completed', measurementMethod: 'GitHub PR merges', frequency: 'Weekly', weight: 25 },
    { title: 'Code Quality & Clean Architecture', explanation: 'Writing clean, typed, modular code adhering to JelTech design system standards.', target: 'Passes linting and peer code reviews', measurementMethod: 'GitHub code reviews', frequency: 'Weekly', weight: 25 },
    { title: 'UI Responsiveness & Polish', explanation: 'Ensuring fluid layouts, responsive breakpoints, accessible markup, and smooth interactions.', target: 'Zero layout bugs across mobile/tablet/desktop', measurementMethod: 'Cross-browser testing', frequency: 'Weekly', weight: 20 },
    { title: 'Bug Resolution & Speed', explanation: 'Diagnosing and resolving defects reported during development and user testing.', target: '< 24hr fix turnaround for high-priority bugs', measurementMethod: 'Issue tracker resolution time', frequency: 'Bi-weekly', weight: 15 },
    { title: 'Documentation & Communication', explanation: 'Documenting component usage, environment variables, and clear PR summaries.', target: 'Comprehensive PR descriptions on all commits', measurementMethod: 'PR review checklist', frequency: 'Weekly', weight: 15 }
  ],
  'UI/UX Design': [
    { title: 'User Journey & Wireframing', explanation: 'Creating structured wireframes and user flow diagrams for digital canvas products.', target: 'Complete flow maps for all client journeys', measurementMethod: 'Figma review with team', frequency: 'Bi-weekly', weight: 25 },
    { title: 'High-Fidelity Prototype Quality', explanation: 'Crafting polished, pixel-perfect layouts using modern typography and token systems.', target: 'Zero visual inconsistencies against design system', measurementMethod: 'Design sign-off', frequency: 'Weekly', weight: 25 },
    { title: 'Design System Consistency', explanation: 'Extending and maintaining reusable components, variables, and typography tokens.', target: 'All components tokenized in Figma', measurementMethod: 'Design system audit', frequency: 'Monthly', weight: 20 },
    { title: 'User Feedback Iteration', explanation: 'Incorporating client and team feedback quickly without losing design intent.', target: 'Turnaround within 48 hours for iterations', measurementMethod: 'Revision log', frequency: 'Weekly', weight: 15 },
    { title: 'Handoff Preparation', explanation: 'Clear developer handoff with annotations, responsive rules, and exported assets.', target: 'Zero ambiguities reported by engineering', measurementMethod: 'Engineering handoff check', frequency: 'Bi-weekly', weight: 15 }
  ]
};
