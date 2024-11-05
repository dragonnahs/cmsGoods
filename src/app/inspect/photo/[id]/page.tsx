export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = ['1', '2', '3', '4', '5', '6'];
  return slugs.map((slug) => ({ id: slug }));
}

export default async function PhotoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <div className="card">{id}</div>;
}
