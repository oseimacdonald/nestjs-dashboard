import { fetchFilteredInvoices } from '@/lib/data';

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
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b">
                <td className="px-3 py-3">{invoice.name}</td>
                <td className="px-3 py-3">{invoice.email}</td>
                <td className="px-3 py-3">{invoice.amount}</td>
                <td className="px-3 py-3">{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
