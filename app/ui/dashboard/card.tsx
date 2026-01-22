interface CardProps {
  title: string;
  value: number;
  type: 'collected' | 'pending' | 'invoices' | 'customers';
}

export default function Card({ title, value, type }: CardProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-2 text-xl font-semibold">{value}</p>
      <p className="text-xs text-gray-500">{type}</p>
    </div>
  );
}
