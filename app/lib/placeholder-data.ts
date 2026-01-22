export const users = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@acme.com',
    password: '123456',
  },
];

export const customers = [
  {
    id: 'c1',
    name: 'Acme Corp',
    email: 'contact@acme.com',
    image_url: '/customers/acme.png',
  },
  {
    id: 'c2',
    name: 'Globex',
    email: 'info@globex.com',
    image_url: '/customers/globex.png',
  },
];

export const invoices = [
  {
    id: 'i1',
    customer_id: 'c1',
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    id: 'i2',
    customer_id: 'c2',
    amount: 20348,
    status: 'paid',
    date: '2022-11-14',
  },
];

export const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 2600 },
  { month: 'Jul', revenue: 2800 },
  { month: 'Aug', revenue: 3000 },
  { month: 'Sep', revenue: 3200 },
  { month: 'Oct', revenue: 3400 },
  { month: 'Nov', revenue: 3600 },
  { month: 'Dec', revenue: 4000 },
];
