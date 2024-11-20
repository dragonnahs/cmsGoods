import { Suspense } from 'react';
import { EmailsTableSkeleton } from '@/app/ui/skeletons';
import EmailsTable from '@/app/ui/transactions/emails-table';
import { fetchEmailsByMainId } from '@/lib/data';
import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/transactions/search';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    mainId?: string;
    page?: string;
  }>;
}) {
  const mainId = (await searchParams)?.mainId || '';
  const totalPages = await fetchEmailsByMainId(mainId);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Email Transactions</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search by Main ID..." searchType="mainId" />
      </div>
      <Suspense fallback={<EmailsTableSkeleton />}>
        <EmailsTable emailTransactions={await fetchEmailsByMainId(mainId)} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages.length} />
      </div>
    </div>
  );
}
