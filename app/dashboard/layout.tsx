"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  DocumentTextIcon,
  UsersIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline"
import SideNav from '@/app/ui/dashboard/sidenav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  function linkClass(path: string, exact = false) {
    const base =
      "flex items-center gap-3 rounded px-3 py-2 transition hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700"
    const active =
      "bg-gray-200 font-semibold border-l-4 border-indigo-500 dark:bg-gray-800"

    const isActive = exact
      ? pathname === path
      : pathname.startsWith(path)

    return isActive ? `${base} ${active}` : base
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 border-r">
        {/* Brand Header */}
        <div className="flex items-center gap-2 px-4 py-4 bg-indigo-600 text-white font-bold">
          <BuildingOffice2Icon className="h-6 w-6 text-white" />
          <span className="text-lg tracking-tight">Acme</span>
        </div>


        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className={linkClass("/dashboard", true)}
          >
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>

          <Link
            href="/dashboard/invoices"
            className={linkClass("/dashboard/invoices")}
          >
            <DocumentTextIcon className="h-5 w-5" />
            Invoices
          </Link>

          <Link
            href="/dashboard/customers"
            className={linkClass("/dashboard/customers")}
          >
            <UsersIcon className="h-5 w-5" />
            Customers
          </Link>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
        {children}
      </main>
    </div>
  )
}
