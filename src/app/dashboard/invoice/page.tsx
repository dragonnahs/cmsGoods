/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-13 12:12:38
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-14 17:32:51
 * @FilePath: \react-next-p\src\app\dashboard\invoice\page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';

import { fetchApi } from '@/lib/api/request';

export default function Page() {
  const handleInitData = async () => {
    const res = await fetchApi('/seed');
    console.log(res);
  };
  return (
    <div>
      invoice
      <button onClick={handleInitData}>初始化</button>
    </div>
  );
}
