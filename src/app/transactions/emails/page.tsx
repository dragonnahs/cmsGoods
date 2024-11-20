import { Suspense } from 'react';
import { EmailsTableSkeleton } from '@/app/ui/skeletons';
import EmailsTable from '@/app/ui/transactions/emails-table';
import { fetchEmailsByEmailUrl } from '@/lib/data';
import Search from '@/app/ui/transactions/search';
import { Button } from '@/app/ui/invoices/button';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    email?: string;
    page?: string;
  }>;
}) {
  const emailUrl = (await searchParams)?.email || '';
  const emailTransactions = await fetchEmailsByEmailUrl(emailUrl);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Email Transactions</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="flex items-center gap-2 flex-1">
          <Search placeholder="Search by Email..." searchType="query" />
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="button"
            form="search-form"
          >
            Query
          </Button>
        </div>
      </div>
      <Suspense fallback={<EmailsTableSkeleton />}>
        <EmailsTable emailTransactions={emailTransactions} />
      </Suspense>
    </div>
  );
}
