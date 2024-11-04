'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

export default function SettingsSegment() {
  const segments = useSelectedLayoutSegments();
  console.log(segments, 11);
  return <div>settings segment</div>;
}
