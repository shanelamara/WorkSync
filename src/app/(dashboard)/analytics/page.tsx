import React from 'react';
import { INITIAL_PRODUCTIVITY } from '@/data/seedData';
import { ProductivityStats } from '@/features/analytics/components/ProductivityStats';
import { Card } from '@/components/ui/Card';
import { BarChart3, TrendingUp, Award, Zap } from 'lucide-react';

export default function AnalyticsPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxVal = Math.max(...INITIAL_PRODUCTIVITY.weeklyVelocity);

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
          Productivity & Velocity
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Real-time metrics on completed throughput, velocity trends, and streaks.
        </p>
      </div>

      <ProductivityStats stats={INITIAL_PRODUCTIVITY} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Weekly Velocity Chart */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Weekly Completed Tasks
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Daily completion volume over the last 7 days
              </span>
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
              +18% vs prev week
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '180px',
              paddingTop: '1rem',
              gap: '0.75rem',
            }}
          >
            {INITIAL_PRODUCTIVITY.weeklyVelocity.map((val, idx) => {
              const heightPct = Math.round((val / maxVal) * 100);
              return (
                <div
                  key={days[idx]}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {val}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '36px',
                      height: `${heightPct}%`,
                      background: 'linear-gradient(180deg, var(--accent-primary) 0%, rgba(99, 102, 241, 0.3) 100%)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'height 0.3s ease',
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {days[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Milestone Badges */}
        <Card>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Productivity Milestones
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(234, 179, 8, 0.15)',
                  color: 'var(--accent-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  10-Day Streak Master
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Maintained daily completions for 12 consecutive days
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Velocity Peak
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Completed 11 tasks in a single day
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
