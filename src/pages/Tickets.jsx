import { useMemo, useState } from 'react';
import TicketForm from '../components/TicketForm.jsx';
import { useTicketStore } from '../store/ticketStore.js';
import { useToast } from '../hooks/useToast.js';

const statusFilters = [
  { value: 'all', label: 'All tickets' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' }
];

const Tickets = () => {
  const tickets = useTicketStore((state) => state.tickets);
  const addTicket = useTicketStore((state) => state.addTicket);
  const updateTicket = useTicketStore((state) => state.updateTicket);
  const deleteTicket = useTicketStore((state) => state.deleteTicket);

  const { showError, showSuccess } = useToast();

  const [filter, setFilter] = useState('all');
  const [editingTicketId, setEditingTicketId] = useState(null);

  const editingTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === editingTicketId) ?? null,
    [tickets, editingTicketId]
  );

  const filteredTickets = useMemo(() => {
    if (filter === 'all') {
      return [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return tickets
      .filter((ticket) => ticket.status === filter)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [filter, tickets]);

  const handleCreate = (values, helpers) => {
    try {
      const nextTicket = addTicket(values);
      showSuccess('Ticket created', `“${nextTicket.title}” is now ${nextTicket.status.replace('_', ' ')}.`);
      helpers.reset();
    } catch (error) {
      showError('Failed to create ticket', error.message ?? 'Please retry.');
    }
  };

  const handleUpdate = (values) => {
    if (!editingTicket) return;

    try {
      const updated = updateTicket(editingTicket.id, values);
      showSuccess('Ticket updated', `“${updated.title}” changes saved successfully.`);
      setEditingTicketId(null);
    } catch (error) {
      showError('Failed to update ticket', error.message ?? 'Please retry.');
    }
  };

  const handleDelete = (ticketId) => {
    const ticket = tickets.find((item) => item.id === ticketId);
    if (!ticket) return;

    const confirmed = window.confirm(`Delete “${ticket.title}”? This cannot be undone.`);
    if (!confirmed) return;

    try {
      deleteTicket(ticketId);
      if (editingTicketId === ticketId) {
        setEditingTicketId(null);
      }
      showSuccess('Ticket deleted', 'The ticket has been removed.');
    } catch (error) {
      showError('Failed to delete ticket', error.message ?? 'Please retry.');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <header className="dashboard-header" style={{ alignItems: 'flex-start' }}>
        <div className="dashboard-heading">
          <span className="tag tag-open" aria-label="Ticket workspace">
            Ticket workspace
          </span>
          <h1>Stay on top of every ticket</h1>
          <span>Track, collaborate, and resolve tickets without switching tabs.</span>
        </div>
        <div className="ticket-filters" role="radiogroup" aria-label="Filter tickets by status">
          {statusFilters.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={filter === option.value}
              className={`btn btn-secondary${filter === option.value ? ' active' : ''}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <section className="tablet-two-column" style={{ marginTop: '2rem' }}>
        <article className="card" style={{ display: 'grid', gap: '1.5rem' }}>
          <header>
            <h2 style={{ margin: 0 }}>Create a new ticket</h2>
            <p style={{ color: '#6c7391', marginBottom: 0 }}>
              Provide a clear title and status. You can always edit details later.
            </p>
          </header>
          <TicketForm submitLabel="Create ticket" onSubmit={handleCreate} />
        </article>

        <article className="card" style={{ display: 'grid', gap: '1.5rem' }}>
          <header>
            <h2 style={{ margin: 0 }}>Editing</h2>
            <p style={{ color: '#6c7391', marginBottom: 0 }}>
              Select a ticket to edit its details. Changes are saved instantly.
            </p>
          </header>
          {editingTicket ? (
            <TicketForm
              key={editingTicket.id}
              initialValues={editingTicket}
              submitLabel="Save changes"
              onSubmit={handleUpdate}
              onCancel={() => setEditingTicketId(null)}
            />
          ) : (
            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
              <strong>No ticket selected</strong>
              <p>Choose a ticket from the list to start editing.</p>
            </div>
          )}
        </article>
      </section>

      <section style={{ marginTop: '3rem' }} aria-live="polite">
        <header className="dashboard-heading" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Tickets ({filteredTickets.length})</h2>
          <span>Card-based view with quick actions and status tags.</span>
        </header>
        {filteredTickets.length === 0 ? (
          <div className="empty-state">
            <strong>No tickets found</strong>
            <p>Try creating a new ticket or adjust the filters above.</p>
          </div>
        ) : (
          <div className="grid ticket-grid">
            {filteredTickets.map((ticket) => (
              <article key={ticket.id} className="card ticket-card" aria-describedby={`ticket-${ticket.id}`}>
                <div className="ticket-meta" id={`ticket-${ticket.id}`}>
                  <strong>{ticket.title}</strong>
                  <span className={`tag tag-${ticket.status}`}>{ticket.status.replace('_', ' ')}</span>
                </div>
                {ticket.priority && (
                  <span style={{ fontWeight: 600, color: '#4f5dff' }}>Priority: {ticket.priority}</span>
                )}
                {ticket.description && <p style={{ margin: 0 }}>{ticket.description}</p>}
                <div style={{ fontSize: '0.85rem', color: '#6c7391' }}>
                  <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
                  {ticket.updatedAt && (
                    <><br />Updated: {new Date(ticket.updatedAt).toLocaleString()}</>
                  )}
                </div>
                <div className="ticket-actions">
                  <button type="button" className="btn" onClick={() => setEditingTicketId(ticket.id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Tickets;
