import LayoutSegment from './components/LayoutSegment';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center">
      <LayoutSegment />
      {children}
    </div>
  );
}
