import CommentIcon from "@/Icon/commentIcon";
import HeartIcon from "@/Icon/heartIcon";
import MessageIcon from "@/Icon/messageIcon";
import SaveIcon from "@/Icon/saveIcon";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function ReactInPost({ className }: Props) {
  return (
    <div className={className}>
      <div className="flex">
        <HeartIcon className="w-6 h-6 mr-4 cursor-pointer hover:text-slate-400" />
        <Link href="/post/123">
          <CommentIcon className="w-6 h-6 mr-4 cursor-pointer hover:text-slate-400" />
        </Link>
        <MessageIcon className="w-6 h-6 cursor-pointer hover:text-slate-400" />
      </div>
      <SaveIcon className="w-6 h-6 cursor-pointer hover:text-slate-400" />
    </div>
  );
}
