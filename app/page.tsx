import styles from '@/app/ui/home.module.css';
import Status from '@/app/ui/status';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Chapter 3 Complete
      </h1>

      {/* CSS Modules (Chapter 2) */}
      <div className={styles.shape} />

      {/* Secondary font (Chapter 3) */}
      <p className={`${lusitana.className} text-lg`}>
        Optimized fonts with Next.js
      </p>

      {/* Hero Images (Chapter 3) */}
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        {/* Desktop image */}
        <Image
          src="/hero-desktop.png"
          width={1356}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />

        {/* Mobile image */}
        <Image
          src="/hero-mobile.png"
          width={560}
          height={314}
          className="block md:hidden"
          alt="Screenshots of the dashboard project showing mobile version"
        />
      </div>

      {/* clsx demo (Chapter 2) */}
      <div className="flex gap-4">
        <Status status="pending" />
        <Status status="paid" />
      </div>
    </main>
  );
}
