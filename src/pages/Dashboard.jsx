import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { useTicketStore } from '../store/ticketStore.js';

const formatDate = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const Dashboard = () => {
  const tickets = useTicketStore((state) => state.tickets);
  const user = useAuthStore((state) => state.user);

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === 'open').length;
    const inProgress = tickets.filter((ticket) => ticket.status === 'in_progress').length;
    const closed = tickets.filter((ticket) => ticket.status === 'closed').length;

    const completionRate = total > 0 ? Math.round((closed / total) * 100) : 0;

    const recent = [...tickets]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    return {
      total,
      open,
      inProgress,
      closed,
      completionRate,
      recent
    };
  }, [tickets]);

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <header className="dashboard-header">
        <div className="dashboard-heading">
          <span className="tag tag-open" aria-label="Logged in user">
            Welcome back
          </span>
          <h1>Hi {user?.name?.split(' ')[0] ?? 'there'}, here&apos;s your control center</h1>
          <span>Manage tickets, track progress, and collaborate with your team in real time.</span>
        </div>
        <div className="hero-actions" style={{ justifyContent: 'flex-end' }}>
          <Link to="/tickets" className="btn">
            Manage tickets
          </Link>
          <Link to="/tickets" className="btn btn-secondary">
            View board
          </Link>
        </div>
      </header>

      <section className="grid stats-grid" aria-label="Ticket statistics">
        <article className="card" role="status">
          <h2 style={{ marginTop: 0 }}>Total tickets</h2>
          <strong style={{ fontSize: '2.5rem' }}>{stats.total}</strong>
          <p style={{ color: '#6c7391' }}>All tickets across all status.</p>
        </article>
        <article className="card" role="status">
          <h2 style={{ marginTop: 0 }}>Open tickets</h2>
          <strong style={{ fontSize: '2.5rem', color: '#2f8f46' }}>{stats.open}</strong>
          <p style={{ color: '#6c7391' }}>Items that require immediate attention.</p>
        </article>
        <article className="card" role="status">
          <h2 style={{ marginTop: 0 }}>In progress</h2>
          <strong style={{ fontSize: '2.5rem', color: '#a86a08' }}>{stats.inProgress}</strong>
          <p style={{ color: '#6c7391' }}>Currently being worked on.</p>
        </article>
        <article className="card" role="status">
          <h2 style={{ marginTop: 0 }}>Resolved</h2>
          <strong style={{ fontSize: '2.5rem', color: '#495057' }}>{stats.closed}</strong>
          <p style={{ color: '#6c7391' }}>Completed tickets..</p>
        </article>
      </section>

      <section className="tablet-two-column" style={{ marginTop: '3rem' }}>
        <article className="card" style={{ display: 'grid', gap: '1.5rem' }}>
          <header>
            <h2 style={{ margin: 0 }}>Progress overview</h2>
            <p style={{ color: '#6c7391', marginBottom: 0 }}>
              Stay ahead with a quick snapshot of how your tickets are performing.
            </p>
          </header>
          <div
            role="img"
            aria-label={`Completion rate ${stats.completionRate}%`}
            style={{
              background: 'rgba(79, 93, 255, 0.08)',
              borderRadius: '24px',
              padding: '2rem',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <div
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: `conic-gradient(#4f5dff ${stats.completionRate}%, rgba(79, 93, 255, 0.2) ${stats.completionRate}% 100%)`,
                display: 'grid',
                placeItems: 'center',
                color: '#4f5dff',
                fontWeight: 700,
                fontSize: '1.75rem'
              }}
            >
              {stats.completionRate}%
            </div>
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#4a5272' }}>
            <li>Daily Ticket Management: Make sure open tickets are reviewed each day.</li>
            <li>Celebrate Success: Acknowledge and celebrate the resolution of tickets</li>
            <li>Maintain Accuracy: Regularly update ticket statuses to ensure clarity.</li>
          </ul>
        </article>

        <article className="card" style={{ display: 'grid', gap: '1.25rem' }}>
          <header>
            <h2 style={{ margin: 0 }}>Recent tickets</h2>
            <p style={{ color: '#6c7391', marginBottom: 0 }}>
              A quick view of what was recently created.
            </p>
          </header>
          {stats.recent.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
              <strong>No tickets yet</strong>
              <p>Once you start creating tickets, they&apos;ll appear here.</p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '1rem' }}>
              {stats.recent.map((ticket) => (
                <li key={ticket.id} className="card-soft" style={{ display: 'grid', gap: '0.5rem' }}>
                  <div className="ticket-meta">
                    <strong>{ticket.title}</strong>
                    <span className={`tag tag-${ticket.status}`}>{ticket.status.replace('_', ' ')}</span>
                  </div>
                  <span style={{ color: '#6c7391', fontSize: '0.9rem' }}>
                    Created on {formatDate(ticket.createdAt)}
                  </span>
                  {ticket.description && <p style={{ margin: 0 }}>{ticket.description}</p>}
                </li>
              ))}
            </ul>
          )}
          <Link to="/tickets" className="btn btn-secondary" style={{ justifySelf: 'flex-start' }}>
            Go to tickets
          </Link>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
