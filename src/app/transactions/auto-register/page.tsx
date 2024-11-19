/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-19 17:39:37
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-19 17:41:18
 * @FilePath: \react-next-p\src\app\transactions\auto-register\page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Suspense } from 'react';
import { AutoRegisterTableSkeleton } from '@/app/ui/skeletons';
import AutoRegisterTable from '@/app/ui/transactions/auto-register-table';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Auto Registration</h1>
      </div>
      <Suspense fallback={<AutoRegisterTableSkeleton />}>
        <AutoRegisterTable />
      </Suspense>
    </div>
  );
}
