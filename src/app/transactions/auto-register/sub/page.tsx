import { Suspense } from 'react';
import { AutoRegisterTableSkeleton } from '@/app/ui/skeletons';
import AutoRegisterTable from '@/app/ui/transactions/auto-register-table';
import SubRegisterForm from '@/app/ui/transactions/sub-register-form';
import { fetchMainEmail } from '@/lib/data';

export default async function Page() {
  const mainEmail = await fetchMainEmail();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mt-6">
        <h1 className="text-2xl">Sub Email Registration</h1>
      </div>

      <div className="mt-4">
        <SubRegisterForm mainEmail={mainEmail} />
      </div>

      <Suspense fallback={<AutoRegisterTableSkeleton />}>
        <AutoRegisterTable mainEmail={mainEmail} />
      </Suspense>
    </div>
  );
}
