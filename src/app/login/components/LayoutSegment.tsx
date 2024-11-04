'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

export default function LayoutSegment() {
  const segment = useSelectedLayoutSegment();
  console.log(segment);
  return <div>layout segment</div>;
}
