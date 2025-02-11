"use client";
import Image from "next/image";
import UserCompact from "../UserCompact/UserCompact";
import ReactInPost from "../ReactInPost/ReactInPost";
import convertLocateNumber from "@/util/function/convertLocateNumber";
import CloseIcon from "@/Icon/closeIcon";
import Comment from "../Comment/Comment";
import PlusIcon from "@/Icon/plusIcon";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LikeOfPost from "../LikeOfPost";

type Props = {
  className?: string;
  params: string;
};

export default function DetailPost({ className, params }: Props) {
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
  const [showLike, setShowLike] = useState(false);
  const onClosePopover = () => setShowLike(!showLike);
  useEffect(() => {
    // Focus on the modal when it is opened
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Close the modal when clicked outside
    function handleClickOutside(e: MouseEvent) {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        router.back();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);
  return (
    <div
      className="bg-white w-3/4 h-full flex"
      tabIndex={0}
      ref={divRef}
      onKeyDown={(e) => {
        if (e.key === "Escape") router.back();
      }}
    >
      <div className="w-1/2 h-full">
        <Image
          src="/logo.jpg"
          alt="photo"
          width={200}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-1/2 h-full flex flex-col">
        <div className=" p-4 w-full border-b border-slate-200 bg-white">
          <UserCompact className="flex items-center justify-between" />
        </div>

        <div className="overflow-y-scroll w-full h-full p-4">
          <Comment className="flex" />
          <Comment className="flex" />
          <Comment className="flex" />
          <Comment className="flex" />
          <Comment className="flex" />
          <Comment className="flex" />
          <Comment className="flex" />
          <Comment className="flex" />
          <Comment className="flex" />
          <PlusIcon className="w-8 h-8 cursor-pointer mx-auto" />
        </div>

        <div className=" w-full">
          <div className="p-4 border-y border-slate-200">
            <ReactInPost className="flex items-center justify-between mb-2" />
            <button
              onClick={() => setShowLike(!showLike)}
              className="text-sm font-semibold mb-2"
            >
              {convertLocateNumber(10000000)} likes
            </button>
            <p className="text-slate-400 text-xs">1 day ago</p>
          </div>
          <div className="flex justify-between px-2">
            <input
              placeholder="Add comment..."
              className="px-2 py-4 text-sm outline-none w-full"
            />
            <button className="text-sm text-blue-400 mr-2">Post</button>
          </div>
        </div>
      </div>
      {showLike && <LikeOfPost onClosePopover={onClosePopover} />}
    </div>
  );
}
