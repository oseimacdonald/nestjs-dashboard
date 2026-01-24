import { generateYAxis } from '@/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/ui/fonts';
import { fetchRevenue } from '@/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
  <div className="w-full md:col-span-4">
    <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      Recent Revenue
    </h2>

    <div className="rounded-xl bg-gray-50 p-4">
      <div className="grid grid-cols-13 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13">
        <div className="flex flex-col justify-between gap-4 text-xs text-gray-400">
          {yAxisLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
        </div>

        {revenue.map((month) => (
          <div key={month.month} className="flex flex-col items-center gap-2">
            <div
              className="w-full rounded-md bg-blue-300"
              style={{
                height: `${(month.revenue / topLabel) * chartHeight}px`,
              }}
            />
            <p className="text-xs text-gray-400">{month.month}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center pb-2 pt-6">
        <CalendarIcon className="h-5 w-5 text-gray-500" />
        <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
      </div>
    </div>
  </div>
);

}
