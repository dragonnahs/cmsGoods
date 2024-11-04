'use client';

import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function MyForm() {
  const path = usePathname();
  const segment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();
  const router = useRouter();
  const handleSubmit = () => {
    console.log('login', router, path, segment, segments);
    localStorage.setItem('token', '123');
    router.push('/dash');
  };
  return (
    <>
      <label htmlFor="username" className="flex items-center mt-2 mb-2">
        username:
        <input
          className="border p-2 ml-2 rounded-lg"
          type="text"
          placeholder="username"
          aria-label="username"
        />
      </label>
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleSubmit}
      >
        登录
      </button>
    </>
  );
}
