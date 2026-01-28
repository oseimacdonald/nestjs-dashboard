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
import Link from 'next/link';

export default function Form({
  customers,
}: {
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction, isPending] =
    useActionState(createInvoice, initialState);

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
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.customerId?.map((e) => (
            <p key={e} className="mt-2 text-sm text-red-500">
              {e}
            </p>
          ))}
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
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.amount?.map((e) => (
            <p key={e} className="mt-2 text-sm text-red-500">
              {e}
            </p>
          ))}
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="pending" />
              <ClockIcon className="h-4 w-4" />
              Pending
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="paid" />
              <CheckIcon className="h-4 w-4" />
              Paid
            </label>
          </div>

          {state.errors?.status?.map((e) => (
            <p key={e} className="mt-2 text-sm text-red-500">
              {e}
            </p>
          ))}
        </fieldset>

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

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
}
