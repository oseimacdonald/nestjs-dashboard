import { fetchLatestInvoices } from '@/lib/data';
import { lusitana } from '@/ui/fonts';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
  <div className="flex w-full flex-col md:col-span-4">
    <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      Latest Invoices
    </h2>

    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
      <div className="bg-white px-6">
        {latestInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-row items-center justify-between border-b py-4"
          >
            <div className="flex items-center">
              <img
                src={invoice.image_url}
                alt={`${invoice.name}'s profile picture`}
                className="mr-4 rounded-full"
                width={32}
                height={32}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">
                  {invoice.name}
                </p>
                <p className="hidden text-sm text-gray-500 sm:block">
                  {invoice.email}
                </p>
              </div>
            </div>
            <p className={`${lusitana.className} truncate text-sm font-medium`}>
              {invoice.amount}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center pb-2 pt-6">
        <p className="text-sm text-gray-500">Updated just now</p>
      </div>
    </div>
  </div>
);

}
