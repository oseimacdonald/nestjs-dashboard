export const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Admin User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

export const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Acme Corp',
    email: 'contact@acme.com',
    image_url: '/customers/acme.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Globex',
    email: 'info@globex.com',
    image_url: '/customers/globex.png',
  },
];

export const invoices = [
  {
    id: '243e7c03-9c1d-4f3e-9e1a-9c1d4f3e9e1a',
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 666,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    id: 'a1b2c3d4-1234-5678-9101-abcdefabcdef',
    customer_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
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
