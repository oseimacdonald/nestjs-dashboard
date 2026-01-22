import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  const data = await sql<
    { month: string; revenue: number }[]
  >`
    SELECT * FROM revenue
  `;

  return Array.from(data);
}

export async function fetchLatestInvoices() {
  const data = await sql<
    {
      amount: number;
      name: string;
      email: string;
      image_url: string;
    }[]
  >`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email
   s
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5
  `;

  return Array.from(data);
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
