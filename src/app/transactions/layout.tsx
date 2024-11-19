import { Metadata } from 'next';
import SideNav from '@/app/ui/transactions/sidenav';

export const metadata: Metadata = {
  title: 'Transactions Dashboard',
  description: 'Manage your transactions and auto-registrations',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
