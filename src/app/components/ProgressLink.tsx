'use client';

import Link from 'next/link';
import { useProgressBar } from '../hooks/useProgressBar';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function ProgressLink({
  href,
  children,
  rest,
}: {
  href: string;
  children: React.ReactNode;
  rest?: React.ComponentProps<typeof Link>;
}) {
  const router = useRouter();
  const progress = useProgressBar();
  const navigateToDestination = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(e);
    e.preventDefault();
    progress.start();
    startTransition(() => {
      router.push(href);
      progress.done();
    });
  };
  return (
    <Link href="" onClick={navigateToDestination} {...rest}>
      {children}
    </Link>
  );
}
