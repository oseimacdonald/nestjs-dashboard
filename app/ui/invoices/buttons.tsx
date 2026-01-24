import { deleteInvoice } from '@/lib/actions';

export function CreateInvoice() {
  return (
    <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
      Create Invoice
    </button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
      </button>
    </form>
  );
}
