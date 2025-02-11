import DetailPost from "@/components/DetailPost.tsx";
type Props = {
  params: {id: string};
};

export default function PostPage({ params }: Props) {
  return (
    <>
      <DetailPost params={params.id} />
    </>
  );
}