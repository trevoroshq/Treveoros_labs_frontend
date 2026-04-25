'use client';

import { useState } from 'react';

/* ─── Data ────────────────────────────────────────────────────── */
const foundationTrack = [
  {
    id: 'f1',
    type: 'week',
    label: 'Week 1',
    title: 'Programming Fundamentals',
    icon: '⌨️',
    color: '#38bdf8',
    topics: [
      'Programming basics (Python / JavaScript)',
      'Variables and data types',
      'Loops and conditionals',
      'Basic problem-solving',
    ],
  },
  {
    id: 'f2',
    type: 'week',
    label: 'Week 2',
    title: 'Data Structures Basics',
    icon: '📦',
    color: '#38bdf8',
    topics: [
      'Arrays & Strings',
      'Objects / dictionaries',
      'Searching and basic manipulation',
      'Debugging techniques',
    ],
  },
  {
    id: 'fe1',
    type: 'expert',
    label: 'Expert Session 1',
    title: 'Career Clarity',
    icon: '🎯',
    color: '#a78bfa',
    topics: [
      'Tech domains overview (Web, AI/ML, Data Science, Backend)',
      'Roles and responsibilities',
      'Skills vs industry expectations',
      'Hiring process overview',
      'Common mistakes in career selection',
    ],
  },
  {
    id: 'f3',
    type: 'week',
    label: 'Week 3',
    title: 'Web Fundamentals',
    icon: '🌐',
    color: '#38bdf8',
    topics: [
      'How the internet works',
      'HTTP request-response cycle',
      'HTML basics',
      'CSS basics',
      'JavaScript basics',
      'API introduction',
    ],
  },
  {
    id: 'f4',
    type: 'week',
    label: 'Week 4',
    title: 'Backend Introduction',
    icon: '⚙️',
    color: '#38bdf8',
    topics: [
      'Backend fundamentals',
      'Server basics (Node.js / Flask)',
      'API development (GET, POST)',
      'Routing',
    ],
  },
  {
    id: 'f5',
    type: 'week',
    label: 'Week 5',
    title: 'Database + Authentication',
    icon: '🗄️',
    color: '#38bdf8',
    topics: [
      'Database fundamentals',
      'SQL basics',
      'CRUD operations',
      'Authentication basics',
      'Data flow (frontend → backend → database)',
    ],
  },
  {
    id: 'fe2',
    type: 'expert',
    label: 'Expert Session 2',
    title: 'Industry Reality',
    icon: '🏭',
    color: '#a78bfa',
    topics: [
      'Software development lifecycle',
      'Team collaboration (frontend/backend/product)',
      'Git workflows (PRs, commits)',
      'Feature development process',
      'Debugging and production issues',
    ],
  },
  {
    id: 'f6',
    type: 'week',
    label: 'Week 6',
    title: 'Final Project',
    icon: '🚀',
    color: '#22c55e',
    topics: [
      'Full-stack integration',
      'Project structuring',
      'Code organization',
      'Deployment basics',
    ],
  },
];

const builderTrack = [
  {
    id: 'b1',
    type: 'week',
    label: 'Week 1',
    title: 'Developer Foundations',
    icon: '🔧',
    color: '#38bdf8',
    topics: [
      'Git and GitHub workflows',
      'Backend fundamentals',
      'API basics',
      'PostgreSQL introduction',
    ],
  },
  {
    id: 'b2',
    type: 'week',
    label: 'Week 2',
    title: 'Backend + Deployment',
    icon: '⚡',
    color: '#38bdf8',
    topics: [
      'REST API design',
      'Database integration',
      'Authentication systems',
      'Deployment basics (cloud/EC2)',
    ],
  },
  {
    id: 'b3',
    type: 'week',
    label: 'Week 3',
    title: 'System Design Basics',
    icon: '🏗️',
    color: '#38bdf8',
    topics: [
      'Scalable architecture',
      'Middleware',
      'Logging systems',
      'Error handling',
      'Clean code practices',
    ],
  },
  {
    id: 'b4',
    type: 'week',
    label: 'Week 4',
    title: 'Advanced Backend Systems',
    icon: '🔐',
    color: '#38bdf8',
    topics: [
      'JWT authentication',
      'Rate limiting',
      'API security',
      'Secure backend design',
    ],
  },
  {
    id: 'be1',
    type: 'expert',
    label: 'Expert Session 1',
    title: 'Organization Systems',
    icon: '🏢',
    color: '#a78bfa',
    topics: [
      'System scaling concepts',
      'Infrastructure basics',
      'Cost vs performance',
      'Backend and infra relationship',
      'System failure cases',
    ],
  },
  {
    id: 'b5',
    type: 'week',
    label: 'Week 5',
    title: 'AI/ML Integration',
    icon: '🤖',
    color: '#38bdf8',
    topics: ['ML API usage', 'LLM integration', 'AI feature development'],
  },
  {
    id: 'b6',
    type: 'week',
    label: 'Week 6',
    title: 'Intelligent Systems',
    icon: '🧠',
    color: '#38bdf8',
    topics: ['Recommendation systems', 'Data handling', 'Performance optimization'],
  },
  {
    id: 'b7',
    type: 'week',
    label: 'Week 7',
    title: 'Startup Project Integration',
    icon: '💼',
    color: '#38bdf8',
    topics: [
      'Real-world module development',
      'Backend systems integration',
      'Analytics APIs',
      'Team-based development',
    ],
  },
  {
    id: 'be2',
    type: 'expert',
    label: 'Expert Session 2',
    title: 'Founder Session',
    icon: '🌟',
    color: '#a78bfa',
    topics: [
      'Startup lifecycle',
      'MVP development',
      'Funding stages',
      'Resource management',
      'Scaling strategy',
    ],
  },
  {
    id: 'b8',
    type: 'week',
    label: 'Week 8',
    title: 'Performance + Evaluation',
    icon: '📊',
    color: '#22c55e',
    topics: [
      'Code reviews',
      'Debugging techniques',
      'Performance optimization',
      'System evaluation',
    ],
  },
];

type Node = (typeof foundationTrack)[0];

/* ─── Sub-components ──────────────────────────────────────────── */
function TimelineNode({ node, index }: { node: Node; index: number }) {
  const [open, setOpen] = useState(false);
  const isExpert = node.type === 'expert';

  return (
    <div
      className={`roadmap-node ${isExpert ? 'roadmap-node--expert' : ''} ${open ? 'roadmap-node--open' : ''}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* connector line (desktop horizontal) */}
      <div className="roadmap-connector" />

      <button
        className="roadmap-node__btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ '--node-color': node.color } as React.CSSProperties}
      >
        <span className="roadmap-node__badge">{node.label}</span>
        <div className="roadmap-node__dot" />
        <span className="roadmap-node__icon">{node.icon}</span>
        <span className="roadmap-node__title">{node.title}</span>
        <span className="roadmap-node__chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="roadmap-node__topics">
          {node.topics.map((t, i) => (
            <div key={i} className="roadmap-topic">
              <span className="roadmap-topic__dot" style={{ background: node.color }} />
              {t}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────────── */
export default function Roadmap() {
  const [activeTrack, setActiveTrack] = useState<'foundation' | 'builder'>('foundation');
  const nodes = activeTrack === 'foundation' ? foundationTrack : builderTrack;

  return (
    <div className="roadmap">
      {/* Tab Toggle */}
      <div className="roadmap__tabs">
        <button
          className={`roadmap__tab ${activeTrack === 'foundation' ? 'roadmap__tab--active' : ''}`}
          onClick={() => setActiveTrack('foundation')}
          id="roadmap-tab-foundation"
        >
          ◈ Foundation Track
          <span className="roadmap__tab-badge">6 Weeks</span>
        </button>
        <button
          className={`roadmap__tab ${activeTrack === 'builder' ? 'roadmap__tab--active' : ''}`}
          onClick={() => setActiveTrack('builder')}
          id="roadmap-tab-builder"
        >
          ⚡ Builder Track
          <span className="roadmap__tab-badge">8 Weeks</span>
        </button>
      </div>

      {/* Legend */}
      <div className="roadmap__legend">
        <span className="roadmap__legend-item">
          <span className="roadmap__legend-dot" style={{ background: '#38bdf8' }} /> Weekly Module
        </span>
        <span className="roadmap__legend-item">
          <span className="roadmap__legend-dot" style={{ background: '#a78bfa' }} /> Expert Session
        </span>
        <span className="roadmap__legend-item">
          <span className="roadmap__legend-dot" style={{ background: '#22c55e' }} /> Final Project
        </span>
      </div>

      {/* Timeline */}
      <div className="roadmap__timeline" key={activeTrack}>
        {nodes.map((node, i) => (
          <TimelineNode key={node.id} node={node} index={i} />
        ))}
      </div>

      <p className="roadmap__hint">Click any milestone to see topics covered</p>
    </div>
  );
}
