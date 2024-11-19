'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handlePressEnter = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('query', term);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handlePressEnter((e.target as HTMLInputElement).value);
          }
        }}
        defaultValue={searchParams.get('query')?.toString()}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        type="text"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
