import React from 'react';
import { ProductivitySummary } from '@/types';
import { Card } from '@/components/ui/Card';
import { CheckCircle, Flame, TrendingUp, FolderKanban } from 'lucide-react';

interface ProductivityStatsProps {
  stats: ProductivitySummary;
}

export const ProductivityStats: React.FC<ProductivityStatsProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Completed Today',
      value: stats.tasksCompletedToday,
      sublabel: 'Great momentum',
      icon: CheckCircle,
      color: 'var(--accent-emerald)',
    },
    {
      label: 'Focus Streak',
      value: `${stats.currentStreakDays} Days`,
      sublabel: 'Personal record!',
      icon: Flame,
      color: 'var(--accent-amber)',
    },
    {
      label: 'Completion Rate',
      value: `${stats.completionRatePercent}%`,
      sublabel: '+4% vs last week',
      icon: TrendingUp,
      color: 'var(--accent-primary)',
    },
    {
      label: 'Active Projects',
      value: stats.activeProjectsCount,
      sublabel: 'In workspace',
      icon: FolderKanban,
      color: 'var(--accent-cyan)',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
      }}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {card.label}
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color,
                }}
              >
                <Icon size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {card.sublabel}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
