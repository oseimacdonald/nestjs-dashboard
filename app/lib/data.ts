import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { Revenue, Invoice, Customer } from './definitions';
import type { InvoiceForm } from './definitions';

/* =========================
   REVENUE
========================= */
export async function fetchRevenue() {
  const data = await sql`
    SELECT month, revenue
    FROM revenue
  `;

  return data.rows as Revenue[];
}

/* =========================
   DASHBOARD (LATEST)
========================= */
export async function fetchLatestInvoices() {
  const data = await sql`
    SELECT
      invoices.id,
      invoices.amount,
      customers.name,
      customers.email,
      customers.image_url
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5
  `;

  return data.rows;
}

/* =========================
   DASHBOARD CARDS
========================= */
export async function fetchCardData() {
  const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
  const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
  const invoiceStatusPromise = sql`
    SELECT
      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
    FROM invoices
  `;

  const data = await Promise.all([
    invoiceCountPromise,
    customerCountPromise,
    invoiceStatusPromise,
  ]);

  return {
    numberOfInvoices: Number(data[0].rows[0].count),
    numberOfCustomers: Number(data[1].rows[0].count),
    totalPaidInvoices: Number(data[2].rows[0].paid),
    totalPendingInvoices: Number(data[2].rows[0].pending),
  };
}

/* =========================
   INVOICES (TABLE)
========================= */
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const ITEMS_PER_PAGE = 6;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const data = await sql`
    SELECT
      invoices.id,
      invoices.amount,
      invoices.date,
      invoices.status,
      customers.name,
      customers.email,
      customers.image_url
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
    ORDER BY invoices.date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return data.rows;
}

/* =========================
   PAGINATION
========================= */
export async function fetchInvoicesPages(query: string) {
  const count = await sql`
    SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

  return Math.ceil(Number(count.rows[0].count) / 6);
}

/* =========================
   CUSTOMERS
========================= */
import type { CustomerField } from './definitions';

export async function fetchCustomers(): Promise<CustomerField[]> {
  const data = await sql`
    SELECT id, name
    FROM customers
    ORDER BY name ASC
  `;

  return data.rows as CustomerField[];
}

/* =========================
   SINGLE INVOICE
========================= */
export async function fetchInvoiceById(
  id: string,
): Promise<InvoiceForm | null> {
  const parsedId = z.string().uuid().safeParse(id);
  if (!parsedId.success) return null;

  const data = await sql`
    SELECT
      id,
      customer_id,
      amount,
      status
    FROM invoices
    WHERE id = ${id}
  `;

  return (data.rows[0] as InvoiceForm) ?? null;
}

