'use client';

import { useActionState } from 'react';
import { createInvoice, State } from '@/lib/actions';
import { CustomerField } from '@/lib/definitions';
import {
  UserCircleIcon,
  CurrencyDollarIcon,
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/ui/button';
import Link from 'next/link';

export default function Form({
  customers,
}: {
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue=""
              aria-describedby="customer-error"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              aria-describedby="amount-error"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                aria-describedby="status-error"
                className="h-4 w-4 border-gray-300"
              />
              <label htmlFor="pending" className="ml-2 flex items-center gap-1">
                <ClockIcon className="h-4 w-4 text-gray-500" />
                Pending
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="paid"
                name="status"
                type="radio"
                value="paid"
                aria-describedby="status-error"
                className="h-4 w-4 border-gray-300"
              />
              <label htmlFor="paid" className="ml-2 flex items-center gap-1">
                <CheckIcon className="h-4 w-4 text-gray-500" />
                Paid
              </label>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        {/* Global Error */}
        {state.message && (
          <p className="mt-4 text-sm text-red-500">{state.message}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="rounded-md border px-4 py-2 text-sm"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
