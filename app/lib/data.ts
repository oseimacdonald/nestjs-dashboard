import postgres from 'postgres';
import { z } from 'zod';
import { Revenue } from './definitions';
import { Invoice, Customer } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

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

  return Array.from (data);
}


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
    numberOfInvoices: Number(data[0][0].count),
    numberOfCustomers: Number(data[1][0].count),
    totalPaidInvoices: Number(data[2][0].paid),
    totalPendingInvoices: Number(data[2][0].pending),
  };
}

// Fetch filtered invoices (search + pagination)
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

  return data;
}

// Fetch total pages for pagination
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

  const totalPages = Math.ceil(Number(count[0].count) / 6);
  return totalPages;
}

export async function fetchCustomers() {
  const data = await sql<Customer[]>`
    SELECT id, name FROM customers
    ORDER BY name ASC
  `;
  return data;
}

export async function fetchInvoiceById(id: string) {
  // Validate UUID before querying Postgres
  const uuidSchema = z.string().uuid();
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return null;
  }

  try {
    const data = await sql<Invoice[]>`
      SELECT * FROM invoices WHERE id = ${id}
    `;
    return data[0] ?? null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

