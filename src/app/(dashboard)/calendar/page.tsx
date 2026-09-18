'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { INITIAL_TASKS } from '@/data/seedData';
import { Calendar as CalendarIcon, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export default function CalendarPage() {
  const tasksWithDates = INITIAL_TASKS.filter((t) => t.dueDate);

  const [seconds, setSeconds] = useState(1500); // 25 min default
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(2);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      setSessionsCompleted((prev) => prev + 1);
      setSeconds(1500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(1500);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
          Calendar & Schedule
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Upcoming deadlines, time-blocked commitments, and Pomodoro focus intervals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Main Schedule Timeline */}
        <Card>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Upcoming Deadlines
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {tasksWithDates.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    <Clock size={12} />
                    <span>Due {formatDate(task.dueDate)}</span>
                  </div>
                </div>
                <Badge label={task.priority} variant={task.priority} dot />
              </div>
            ))}
          </div>
        </Card>

        {/* Focus Timer / Mini Planner */}
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Focus Session
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Pomodoro focus block for deep execution.
          </p>

          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '4px solid var(--accent-primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px var(--accent-primary-glow)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {timeString}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              {isRunning ? 'Flow State' : 'Interval 1/4'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <Button
              variant="primary"
              size="sm"
              icon={isRunning ? <Pause size={14} /> : <Play size={14} />}
              onClick={toggleTimer}
            >
              {isRunning ? 'Pause' : 'Start Focus'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={<RotateCcw size={14} />}
              onClick={resetTimer}
            >
              Reset
            </Button>
          </div>

          <div
            style={{
              width: '100%',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.85rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <span>Target: 4 blocks</span>
            <span>Completed: {sessionsCompleted} 🔥</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
