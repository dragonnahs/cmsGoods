/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-20 15:06:08
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-20 15:25:48
 * @FilePath: \react-next-p\src\app\transactions\auto-register\main\page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Suspense } from 'react';
import { AutoRegisterTableSkeleton } from '@/app/ui/skeletons';
import AutoRegisterTable from '@/app/ui/transactions/auto-register-table';
import MainRegisterForm from '@/app/ui/transactions/main-register-form';
import { fetchMainEmail } from '@/lib/data';

export default async function Page() {
  const mainEmail = await fetchMainEmail();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mt-6">
        <h1 className="text-2xl">Main Email Registration</h1>
      </div>

      <div className="mt-4">
        <MainRegisterForm mainEmail={mainEmail} />
      </div>

      <Suspense fallback={<AutoRegisterTableSkeleton />}>
        <AutoRegisterTable queryEmail={mainEmail?.email} />
      </Suspense>
    </div>
  );
}
