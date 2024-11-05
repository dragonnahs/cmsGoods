export default function ParallelLayout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div className=" flex w-screen">
      <div className="h-screen bg-blue-500 w-52">left</div>
      <div className=" flex flex-col flex-1">
        <div className="h-20 bg-red-500">top</div>
        {children}
        {team}
        {analytics}
      </div>
    </div>
  );
}
