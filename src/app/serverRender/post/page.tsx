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
      <div
        className="flex w-screen p-10 "
        style={{ backgroundColor: '#0f0f0f' }}
      >
        <CardItem />
      </div>
    </div>
  );
}
