import { Revenue } from './definitions';

export const generateYAxis = (revenue: Revenue[]) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));

  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(i);
  }

  return { yAxisLabels, topLabel };
};

export function generatePagination(currentPage: number, totalPages: number) {
  // If total pages is 7 or less, show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page is near the start
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If current page is near the end
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Otherwise, show current page in the middle
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}
