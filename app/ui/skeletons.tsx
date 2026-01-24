export function CardsSkeleton() {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className="w-full md:col-span-4">
      <div className="h-[350px] rounded-xl bg-gray-100 animate-pulse" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div className="md:col-span-4">
      <div className="h-[350px] rounded-xl bg-gray-100 animate-pulse" />
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return <div className="h-40 w-full animate-pulse rounded-md bg-gray-100" />;
}

export default function DashboardSkeleton() {
  return (
    <main>
      <div className="mb-4 h-8 w-40 rounded bg-gray-100 animate-pulse" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="md:col-span-4 h-[350px] rounded-xl bg-gray-100 animate-pulse" />
        <div className="md:col-span-4 h-[350px] rounded-xl bg-gray-100 animate-pulse" />
      </div>
    </main>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl bg-gray-100 p-6 animate-pulse">
      <div className="h-6 w-24 rounded bg-gray-200" />
      <div className="mt-4 h-10 w-32 rounded bg-gray-200" />
    </div>
  );
}
