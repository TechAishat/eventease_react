import { create } from 'zustand';

const TICKETS_KEY = 'ticketapp_tickets_v1';

const readTickets = () => {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse tickets storage', error);
    return [];
  }
};

const writeTickets = (tickets) => {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

export const useTicketStore = create((set, get) => ({
  tickets: [],
  isHydrated: false,

  hydrate: () => {
    const tickets = readTickets();
    set({ tickets, isHydrated: true });
  },

  addTicket: (ticket) => {
    const newTicket = {
      ...ticket,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updatedTickets = [newTicket, ...get().tickets];
    writeTickets(updatedTickets);
    set({ tickets: updatedTickets });
    return newTicket;
  },

  updateTicket: (id, updates) => {
    const updatedTickets = get().tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, ...updates, updatedAt: new Date().toISOString() } : ticket
    );
    writeTickets(updatedTickets);
    set({ tickets: updatedTickets });
    return updatedTickets.find((ticket) => ticket.id === id);
  },

  deleteTicket: (id) => {
    const updatedTickets = get().tickets.filter((ticket) => ticket.id !== id);
    writeTickets(updatedTickets);
    set({ tickets: updatedTickets });
  },

  getTicketById: (id) => get().tickets.find((ticket) => ticket.id === id)
}));
