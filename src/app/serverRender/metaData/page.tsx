type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const id = (await params).id;
  const keywords = (await searchParams).keywords;
  return {
    title: id + 'server render',
    keywords: keywords,
  };
}

export default function Page() {
  return <div>server render</div>;
}
