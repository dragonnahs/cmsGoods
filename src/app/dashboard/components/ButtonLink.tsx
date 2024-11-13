'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
export default function ButtonLink({
  route,
}: {
  route: { name: string; url: string; id: number };
}) {
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        'w-full p-2 mb-4 text-white transition-all hover:bg-blue-400 cursor-pointer',
        {
          'bg-blue-400': pathname === route.url,
        },
      )}
      href={route.url}
    >
      {route.name}
    </Link>
  );
}
