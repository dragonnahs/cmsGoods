import { Modal } from './modal';

type PageProps = Promise<{
  id: string;
}>;

export default async function PhotoModal({ params }: { params: PageProps }) {
  const { id: photoId } = await params;
  return <Modal>photoid: {photoId}</Modal>;
}
