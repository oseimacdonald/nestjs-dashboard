import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default function Page() {
  return <h1 className="text-2xl font-bold">Customers</h1>;
}
