import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

import {
  users,
  customers,
  invoices,
  revenue,
} from '@/lib/placeholder-data';

export async function GET() {
  try {
    // Create tables
    await sql`
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE customers (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        image_url TEXT
      );
    `;

    await sql`
      CREATE TABLE invoices (
        id UUID PRIMARY KEY,
        customer_id UUID REFERENCES customers(id),
        amount INT NOT NULL,
        status TEXT NOT NULL,
        date DATE NOT NULL
      );
    `;

    await sql`
      CREATE TABLE revenue (
        month TEXT PRIMARY KEY,
        revenue INT NOT NULL
      );
    `;

    // Insert users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword});
      `;
    }

    // Insert customers
    for (const customer of customers) {
      await sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url});
      `;
    }

    // Insert invoices
    for (const invoice of invoices) {
      await sql`
        INSERT INTO invoices (id, customer_id, amount, status, date)
        VALUES (
          ${invoice.id},
          ${invoice.customer_id},
          ${invoice.amount},
          ${invoice.status},
          ${invoice.date}
        );
      `;
    }

    // Insert revenue
    for (const rev of revenue) {
      await sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue});
      `;
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
    });
  } catch (error) {
    console.error('SEED ERROR:', error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
