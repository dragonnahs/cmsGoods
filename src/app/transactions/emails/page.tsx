import { Suspense } from 'react';
import { EmailsTableSkeleton } from '@/app/ui/skeletons';
import EmailsTable from '@/app/ui/transactions/emails-table';
import { fetchEmailTransactions } from '@/lib/data';

export default async function Page() {
  const emailTransactions = await fetchEmailTransactions();

  return (
    <>
      <div className="w-full"></div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Email Transactions</h1>
        <a
          href="/transactions/emails/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Create Email
        </a>
      </div>
      <Suspense fallback={<EmailsTableSkeleton />}>
        <EmailsTable emailTransactions={emailTransactions} />
      </Suspense>
    </>
  );
}
