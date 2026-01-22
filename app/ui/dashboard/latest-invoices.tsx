import { fetchLatestInvoices } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      {/* table JSX exactly as tutorial */}
    </div>
  );
}
