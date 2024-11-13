import { Modal } from './modal';

type PageProps = {
  params: { id: string };
};

export default async function PhotoModal({ params }: PageProps) {
  const { id: photoId } = await params;
  return <Modal>{photoId}</Modal>;
}
