import React from 'react';

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>dash layout nav</nav>
      {children}
    </div>
  );
}
