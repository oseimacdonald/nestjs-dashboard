import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

import {
  users,
  customers,
  invoices,
  revenue,
} from '@/app/lib/placeholder-data';

export async function GET() {
  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        image_url TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID PRIMARY KEY,
        customer_id UUID REFERENCES customers(id),
        amount INT NOT NULL,
        status TEXT NOT NULL,
        date DATE NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month TEXT PRIMARY KEY,
        revenue INT NOT NULL
      );
    `;

    // Insert users
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    // Insert customers
    const insertedCustomers = await Promise.all(
      customers.map((customer) => {
        return sql`
          INSERT INTO customers (id, name, email, image_url)
          VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    // Insert invoices
    const insertedInvoices = await Promise.all(
      invoices.map((invoice) => {
        return sql`
          INSERT INTO invoices (id, customer_id, amount, status, date)
          VALUES (
            ${invoice.id},
            ${invoice.customer_id},
            ${invoice.amount},
            ${invoice.status},
            ${invoice.date}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    // Insert revenue
    const insertedRevenue = await Promise.all(
      revenue.map((rev) => {
        return sql`
          INSERT INTO revenue (month, revenue)
          VALUES (${rev.month}, ${rev.revenue})
          ON CONFLICT (month) DO NOTHING;
        `;
      })
    );

    return NextResponse.json({
      message: 'Database seeded successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error seeding database' },
      { status: 500 }
    );
  }
}
