import Link from 'next/link';

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { label: string; href: string; active?: boolean }[];
}) {
  return (
    <nav className="mb-4 text-sm">
      <ol className="flex gap-2">
        {breadcrumbs.map((crumb) => (
          <li key={crumb.href}>
            {crumb.active ? (
              <span className="font-semibold">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-blue-600 hover:underline">
                {crumb.label}
              </Link>
            )}
            {!crumb.active && ' / '}
          </li>
        ))}
      </ol>
    </nav>
  );
}
