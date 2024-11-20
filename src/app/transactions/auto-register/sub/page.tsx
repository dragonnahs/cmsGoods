/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-20 15:06:12
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-20 17:11:40
 * @FilePath: \react-next-p\src\app\transactions\auto-register\sub\page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Suspense } from 'react';
import { AutoRegisterTableSkeleton } from '@/app/ui/skeletons';
import AutoRegisterTable from '@/app/ui/transactions/auto-register-table';
import SubRegisterForm from '@/app/ui/transactions/sub-register-form';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    email?: string;
    referrer?: string;
  }>;
}) {
  const queryEmail = (await searchParams)?.email || '';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mt-6">
        <h1 className="text-2xl">Sub Email Registration</h1>
      </div>

      <div className="mt-4">
        <SubRegisterForm />
      </div>

      <Suspense fallback={<AutoRegisterTableSkeleton />}>
        <AutoRegisterTable queryEmail={queryEmail} />
      </Suspense>
    </div>
  );
}
