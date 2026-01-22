import clsx from 'clsx';

export default function Status({ status }: { status: 'pending' | 'paid' }) {
  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-sm font-medium',
        {
          'bg-gray-200 text-gray-600': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        }
      )}
    >
      {status}
    </span>
  );
}
