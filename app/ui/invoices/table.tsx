import { fetchFilteredInvoices } from '@/lib/data';
import { UpdateInvoice, DeleteInvoice } from '@/ui/invoices/buttons';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full text-gray-900">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th className="px-3 py-5 font-medium">Customer</th>
              <th className="px-3 py-5 font-medium">Email</th>
              <th className="px-3 py-5 font-medium">Amount</th>
              <th className="px-3 py-5 font-medium">Status</th>
              <th className="px-3 py-5 font-medium">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b last-of-type:border-none">
                <td className="px-3 py-3">{invoice.name}</td>
                <td className="px-3 py-3">{invoice.email}</td>
                <td className="px-3 py-3">
                  ${(invoice.amount / 100).toFixed(2)}
                </td>
                <td className="px-3 py-3 capitalize">{invoice.status}</td>

                <td className="flex justify-end gap-2 px-3 py-3">
                  <UpdateInvoice id={invoice.id} />
                  <DeleteInvoice id={invoice.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
