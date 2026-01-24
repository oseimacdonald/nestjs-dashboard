'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/lib/utils';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2">
      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <Link
            key={index}
            href={createPageURL(page)}
            className={clsx(
              'px-3 py-1 rounded',
              page === currentPage && 'bg-blue-600 text-white',
            )}
          >
            {page}
          </Link>
        ) : (
          <span key={index}>…</span>
        ),
      )}
    </div>
  );
}
