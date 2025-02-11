"use client";
import CloseIcon from "@/Icon/closeIcon";
import DetailPost from "@/components/DetailPost.tsx";
import Modal from "@/components/Modal/modal";
import { useRouter } from "next/navigation";
type Props = {
  params: { id: string };
};

export default function PostPage({ params }: Props) {
  const router = useRouter();

  return (
    <Modal>
      <DetailPost params={params.id} />
      <button
        onClick={() => {
          console.log("close");
          router.back();
        }}
        className="absolute top-2 right-2 cursor-pointer text-white"
      >
        <CloseIcon className="w-8 h-8" />
      </button>
    </Modal>
  );
}
