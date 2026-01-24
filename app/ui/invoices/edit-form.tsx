'use client';

import { CustomerField, InvoiceForm } from '@/lib/definitions';
import { updateInvoice, State } from '@/lib/actions';
import { useActionState } from 'react';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Customer */}
      <div>
        <select
          name="customerId"
          defaultValue={invoice.customer_id}
          aria-describedby="customer-error"
        >
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div id="customer-error" aria-live="polite">
          {state.errors?.customerId?.map((error) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <input
          name="amount"
          type="number"
          defaultValue={invoice.amount / 100}
          aria-describedby="amount-error"
        />

        <div id="amount-error" aria-live="polite">
          {state.errors?.amount?.map((error) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Status */}
      <fieldset>
        <label>
          <input
            type="radio"
            name="status"
            value="paid"
            defaultChecked={invoice.status === 'paid'}
          />
          Paid
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="pending"
            defaultChecked={invoice.status === 'pending'}
          />
          Pending
        </label>

        <div id="status-error" aria-live="polite">
          {state.errors?.status?.map((error) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      {/* Global error */}
      {state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button type="submit">Update Invoice</button>
    </form>
  );
}
