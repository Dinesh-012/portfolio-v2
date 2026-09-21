import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';


type NodeId =
  | 'client'
  | 'gateway'
  | 'product'
  | 'order'
  | 'inventory'
  | 'keycloak'
  | 'swagger'
  | 'mongo'
  | 'mysql-order'
  | 'mysql-inv'
  | 'docker';

interface ArchNode {
  id: NodeId;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: boolean;
  tooltip: string;
}

const NODES: ArchNode[] = [
  {
    id: 'client',
    label: 'Client',
    x: 400,
    y: 36,
    w: 100,
    h: 40,
    tooltip: 'External clients and front-end applications that consume the APIs.',
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    sublabel: 'Spring Cloud',
    x: 360,
    y: 120,
    w: 180,
    h: 52,
    accent: true,
    tooltip: 'Spring Cloud Gateway — single entry point for routing, load balancing, and authentication.',
  },
  {
    id: 'product',
    label: 'Product Service',
    sublabel: 'Spring Boot',
    x: 80,
    y: 250,
    w: 150,
    h: 52,
    tooltip: 'Manages product catalog, details, and pricing. Uses MongoDB for flexible document storage.',
  },
  {
    id: 'order',
    label: 'Order Service',
    sublabel: 'Spring Boot',
    x: 375,
    y: 250,
    w: 150,
    h: 52,
    tooltip: 'Handles order creation, status, and orchestration. Calls Inventory Service to reserve stock.',
  },
  {
    id: 'inventory',
    label: 'Inventory Service',
    sublabel: 'Spring Boot',
    x: 670,
    y: 250,
    w: 160,
    h: 52,
    tooltip: 'Tracks stock levels and reservations. Receives calls from Order Service.',
  },
  {
    id: 'swagger',
    label: 'Swagger / OpenAPI',
    x: 40,
    y: 120,
    w: 150,
    h: 44,
    tooltip: 'API documentation and interactive testing via Swagger UI / OpenAPI specs.',
  },
  {
    id: 'keycloak',
    label: 'Keycloak',
    sublabel: 'Auth / OAuth2',
    x: 710,
    y: 120,
    w: 140,
    h: 52,
    tooltip: 'Centralized identity and access management using OAuth2 / OpenID Connect.',
  },
  {
    id: 'mongo',
    label: 'MongoDB',
    x: 105,
    y: 370,
    w: 100,
    h: 40,
    tooltip: 'Document database used by Product Service for flexible product data.',
  },
  {
    id: 'mysql-order',
    label: 'MySQL',
    sublabel: '(Orders)',
    x: 400,
    y: 370,
    w: 100,
    h: 48,
    tooltip: 'Relational database storing order records and related transactional data.',
  },
  {
    id: 'mysql-inv',
    label: 'MySQL',
    sublabel: '(Inventory)',
    x: 700,
    y: 370,
    w: 110,
    h: 48,
    tooltip: 'Relational database tracking inventory quantities and stock movements.',
  },
  {
    id: 'docker',
    label: 'Docker',
    sublabel: 'Containers',
    x: 760,
    y: 480,
    w: 110,
    h: 48,
    tooltip: 'All services, databases, and Keycloak are containerized with Docker for consistent environments.',
  },
];




const EDGES: { from: NodeId; to: NodeId }[] = [
  { from: 'client', to: 'gateway' },
  { from: 'gateway', to: 'product' },
  { from: 'gateway', to: 'order' },
  { from: 'gateway', to: 'inventory' },
  { from: 'gateway', to: 'swagger' },
  { from: 'gateway', to: 'keycloak' },
  { from: 'product', to: 'mongo' },
  { from: 'order', to: 'mysql-order' },
  { from: 'inventory', to: 'mysql-inv' },
  { from: 'order', to: 'inventory' },
];

// Build adjacency for quick lookup
const adjacency = new Map<NodeId, Set<NodeId>>();
NODES.forEach((n) => adjacency.set(n.id, new Set()));
EDGES.forEach(({ from, to }) => {
  adjacency.get(from)!.add(to);
  adjacency.get(to)!.add(from);
});

function getNodeCenter(id: NodeId) {
  const n = NODES.find((node) => node.id === id)!;
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

function getEdgePath(from: NodeId, to: NodeId): string {
  const a = getNodeCenter(from);
  const b = getNodeCenter(to);

  // Special gentle curves for some edges to reduce overlap
  if (
    (from === 'gateway' && to === 'swagger') ||
    (from === 'swagger' && to === 'gateway')
  ) {
    return `M ${a.x} ${a.y} C ${a.x - 40} ${a.y}, ${b.x + 40} ${b.y}, ${b.x} ${b.y}`;
  }
  if (
    (from === 'gateway' && to === 'keycloak') ||
    (from === 'keycloak' && to === 'gateway')
  ) {
    return `M ${a.x} ${a.y} C ${a.x + 40} ${a.y}, ${b.x - 40} ${b.y}, ${b.x} ${b.y}`;
  }
  if (
    (from === 'order' && to === 'inventory') ||
    (from === 'inventory' && to === 'order')
  ) {
    // Horizontal-ish with slight curve
    const midY = (a.y + b.y) / 2 - 12;
    return `M ${a.x} ${a.y} C ${a.x + 40} ${midY}, ${b.x - 40} ${midY}, ${b.x} ${b.y}`;
  }

  // Straight-ish with soft curve
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const cx = a.x + dx * 0.5;
  const cy = a.y + dy * 0.5;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export default function SystemArchitecture() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const connected = hovered
    ? new Set([hovered, ...(adjacency.get(hovered) || [])])
    : null;

  const handleNodeEnter = useCallback((id: NodeId) => {
    setHovered(id);
  }, []);

  const handleNodeLeave = useCallback(() => {
    setHovered(null);
  }, []);

  // Detect when horizontal scroll is needed (mobile / narrow viewports)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const needsScroll = el.scrollWidth > el.clientWidth + 4;
      setShowScrollHint(needsScroll);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // Hide hint once the user starts scrolling
    const onScroll = () => {
      if (el.scrollLeft > 8) {
        setShowScrollHint(false);
      } else {
        checkOverflow();
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkOverflow);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Colors
  const nodeBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const nodeBorder = isDark ? '#334155' : '#cbd5e1';
  const nodeBorderHover = isDark ? '#6366f1' : '#4f46e5';
  const accentBg = isDark ? 'rgba(49, 46, 129, 0.6)' : 'rgba(99, 102, 241, 0.15)';
  const accentBorder = isDark ? '#818cf8' : '#6366f1';
  const textMain = isDark ? '#f1f5f9' : '#0f172a';
  const textSub = isDark ? '#94a3b8' : '#64748b';
  const edgeColor = isDark ? '#475569' : '#94a3b8';
  const edgeHighlight = isDark ? '#818cf8' : '#6366f1';
  const dimOpacity = 0.22;

  return (
    <div className="mt-10">
      <h4
        className={`text-lg font-semibold mb-1 flex items-center gap-2 ${
          isDark ? 'text-slate-100' : 'text-slate-800'
        }`}
      >
        <span className="inline-block w-2 h-2 rounded-full bg-indigo-400" />
        System Architecture
      </h4>
      <p className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Hover any node to highlight its direct connections
      </p>

      <div
        className={`relative w-full rounded-xl border ${
          isDark
            ? 'border-slate-700/60 bg-slate-950/60'
            : 'border-slate-200 bg-slate-50/80'
        }`}
      >
        {/* Horizontal scroll container – diagram stays 900px wide */}
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden rounded-xl"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <svg
            viewBox="0 0 900 560"
            width={900}
            height={560}
            className="block"
            style={{ minWidth: 900, maxHeight: 560 }}
            preserveAspectRatio="xMidYMid meet"
          >
          {/* Edges */}
          <g>
            {EDGES.map(({ from, to }) => {
              const isActive =
                connected && connected.has(from) && connected.has(to);
              const isDimmed = connected && !isActive;

              return (
                <path
                  key={`${from}-${to}`}
                  d={getEdgePath(from, to)}
                  fill="none"
                  stroke={isActive ? edgeHighlight : edgeColor}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeOpacity={isDimmed ? dimOpacity : 0.85}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Nodes */}
          {NODES.map((node) => {
            const isConnected = connected ? connected.has(node.id) : true;
            const isHovered = hovered === node.id;
            const isDimmed = connected && !isConnected;

            const bg = node.accent ? accentBg : nodeBg;
            const border = isHovered || isConnected
              ? node.accent
                ? accentBorder
                : nodeBorderHover
              : nodeBorder;

            return (
              <g
                key={node.id}
                onMouseEnter={() => handleNodeEnter(node.id)}
                onMouseLeave={handleNodeLeave}

                className="cursor-pointer"
                style={{ opacity: isDimmed ? dimOpacity : 1 }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={10}
                  ry={10}
                  fill={bg}
                  stroke={border}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-300"
                  style={{
                    filter: isHovered
                      ? isDark
                        ? 'drop-shadow(0 0 10px rgba(99,102,241,0.45))'
                        : 'drop-shadow(0 0 8px rgba(99,102,241,0.35))'
                      : undefined,
                  }}
                />
                <text
                  x={node.x + node.w / 2}
                  y={node.sublabel ? node.y + node.h / 2 - 6 : node.y + node.h / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={textMain}
                  fontSize={13}
                  fontWeight={600}
                  className="pointer-events-none select-none"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {node.label}
                </text>
                {node.sublabel && (
                  <text
                    x={node.x + node.w / 2}
                    y={node.y + node.h / 2 + 11}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={textSub}
                    fontSize={10.5}
                    className="pointer-events-none select-none"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}
          </svg>
        </div>

        {/* Scroll-to-explore hint – only when content overflows */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute bottom-3 right-3 z-10"
            >
              <div
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                  backdrop-blur-md border shadow-sm
                  ${
                    isDark
                      ? 'bg-slate-900/85 border-indigo-500/40 text-indigo-300'
                      : 'bg-white/90 border-indigo-300 text-indigo-600'
                  }
                `}
              >
                <span>Scroll to explore</span>
                <span aria-hidden="true">→</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tooltip lives completely outside the diagram so it can never cover nodes or edges */}
      <div className="mt-3 min-h-[72px] flex items-start justify-center">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-xl"
            >
              <div
                className={`
                  px-4 py-3 rounded-lg text-sm leading-snug text-center
                  border backdrop-blur-md
                  ${isDark
                    ? 'bg-slate-900/80 border-indigo-500/40 text-slate-200'
                    : 'bg-white/90 border-indigo-300 text-slate-800 shadow-md'}
                `}
              >
                <div className={`font-semibold mb-0.5 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
                  {NODES.find((n) => n.id === hovered)?.label}
                  {NODES.find((n) => n.id === hovered)?.sublabel && (
                    <span className="font-normal opacity-70">
                      {' · '}
                      {NODES.find((n) => n.id === hovered)?.sublabel}
                    </span>
                  )}
                </div>
                <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {NODES.find((n) => n.id === hovered)?.tooltip}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-sm text-center pt-2 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Hover a node to see details
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


