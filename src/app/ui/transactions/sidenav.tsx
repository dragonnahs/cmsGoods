'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  EnvelopeIcon,
  UserPlusIcon,
  UsersIcon,
  EnvelopeOpenIcon,
} from '@heroicons/react/24/outline';

const links = [
  {
    name: 'All Emails',
    href: '/transactions/emails',
    icon: EnvelopeIcon,
  },
  {
    name: 'Main Register',
    href: '/transactions/auto-register/main',
    icon: UserPlusIcon,
  },
  {
    name: 'Sub Register',
    href: '/transactions/auto-register/sub',
    icon: UsersIcon,
  },
  {
    name: 'Invite',
    href: '/transactions/invite',
    icon: EnvelopeOpenIcon,
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-gray-800 px-3 py-4 md:px-2">
      <div className="mb-8 flex items-center justify-center">
        <h1 className="text-xl font-semibold text-white">Transactions</h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    'flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white',
                    {
                      'bg-gray-700 text-white': pathname === link.href,
                    },
                  )}
                >
                  <LinkIcon className="w-6" />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="text-sm text-gray-400 text-center">Dashboard v1.0</div>
      </div>
    </div>
  );
}
