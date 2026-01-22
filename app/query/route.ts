import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

    return NextResponse.json(data.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error executing query' },
      { status: 500 }
    );
  }
}
