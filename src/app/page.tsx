import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Kanban, Zap, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '1.5rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, #4338ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Sparkles size={20} />
          </div>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            WorkSync
          </span>
        </div>

        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="sm" icon={<ArrowRight size={16} />}>
            Open Workspace
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 2rem',
          maxWidth: '850px',
          margin: '0 auto',
        }}
      >
        <div
          className="badge badge-accent"
          style={{
            marginBottom: '1.5rem',
            padding: '0.35rem 0.85rem',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}
        >
          Personalized Project Management System
        </div>

        <h1
          style={{
            fontSize: '3.25rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}
        >
          Organize, Prioritize & Execute with{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Precision
          </span>
        </h1>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '650px',
          }}
        >
          A frictionless workspace tailored for individual high-performers. Manage projects across
          interactive Kanban boards, structured tables, and productivity analytics.
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Launch Dashboard
            </Button>
          </Link>
          <Link href="/projects" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="lg">
              Explore Projects
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '4.5rem',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <Kanban size={24} style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Dynamic Kanban
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Track tasks through custom stages from Backlog to Done with fluid interactions.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <Zap size={24} style={{ color: 'var(--accent-amber)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Streak & Focus
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Build daily momentum with streak counters and personal focus tracking.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <BarChart2 size={24} style={{ color: 'var(--accent-emerald)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Productivity Velocity
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Measure completion rates, output velocity, and task lifecycle bottlenecks.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
