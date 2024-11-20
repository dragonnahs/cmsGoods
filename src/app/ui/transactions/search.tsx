'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Search({
  placeholder,
  searchType = 'query',
}: {
  placeholder: string;
  searchType?: 'query' | 'mainId';
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const term = inputRef.current?.value || '';
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (searchType === 'mainId') {
      params.set('mainId', term);
    } else {
      params.set('query', term);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      id="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="relative flex flex-1 flex-shrink-0"
    >
      <input
        ref={inputRef}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get(searchType)?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </form>
  );
}
