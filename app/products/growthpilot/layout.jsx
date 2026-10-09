import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'GrowthPilot AI — Marketing Intelligence Platform | JelTech Flagship',
  description:
    'Explore GrowthPilot AI, JelTech’s flagship in-development marketing intelligence platform for small businesses. Discover our architecture, interactive prototype, and engineering roadmap.',
  path: '/products/growthpilot',
});

export default function GrowthPilotLayout({ children }) {
  return children;
}
