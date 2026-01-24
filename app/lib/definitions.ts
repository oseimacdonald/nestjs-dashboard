export type Revenue = {
  month: string;
  revenue: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

/* =========================
   AUTH (REQUIRED FOR NEXTAUTH)
========================= */
export type User = {
  id: string;
  name: string | null;
  email: string;
  password: string;
};
