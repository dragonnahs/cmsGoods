import CardItem from './CardItem';

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = (await searchParams).id;

  return (
    <div>
      post{id}
      <div className="relative w-0 h-0 ml-5 border-l-[15px] border-r-[15px] border-t-[26px] border-b-[26px] border-l-blue-600 border-r-red-600 border-t-black" />
      <div
        className="flex w-screen p-10 "
        style={{ backgroundColor: '#0f0f0f' }}
      >
        <CardItem />
      </div>
    </div>
  );
}
