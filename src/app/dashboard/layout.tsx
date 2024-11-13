import SideNav from './components/SideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-32 bg-blue-500">
        <SideNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
