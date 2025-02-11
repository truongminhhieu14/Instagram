import LogoIcon from "@/Icon/logoIcon";
import NoteIcon from "@/Icon/noteIcon";
import Link from "next/link";
import UserMessage from "../UserMessage/UserMessage";

type Props = {
  className?: string;
};

export default function SideBarMessage({ className }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4 px-6">
        <Link href="/" className="flex cursor-pointer items-center">
          <LogoIcon className="w-8 h-8 mr-2" />
          <div className="text-xl font-bold">1longg</div>
        </Link>
        <button>
          <NoteIcon className="w-8 h-8" />
        </button>
      </div>
      <p className="text-xl font-bold mb-4 px-6">Messages</p>
      <div className="overflow-x-hidden h-full w-full px-6">
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
        <Link href="/message/1" className="mb-4">
          <UserMessage className="rounded-md hover:bg-slate-50 outline-none p-2 flex justify-between items-center" />
        </Link>
      </div>
    </div>
  );
}
