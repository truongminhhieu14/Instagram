"use client";
import Image from "next/image";
import { useState } from "react";
import PopoverCreatePost from "./PopoverCreatePost/PopoverCreatePost";
import { getUser } from "@/service/storage.service";

type Props = {
  className?: string;
};

export default function CreatePost({ className }: Props) {
  const [showPopoverCreatePost, setShowPopoverCreatePost] = useState(false);
  return (
    <div className={className}>
      <Image
        src={`/logo.jpg`}
        width={40}
        height={40}
        className="object-contain mr-3 w-10 h-10 rounded-full"
        alt="avt"
      />
      <button
        onClick={() => setShowPopoverCreatePost(!showPopoverCreatePost)}
        className="w-full border rounded-3xl outline-none px-2 py-4 items-start flex text-sm hover:bg-slate-100 cursor-pointer text-slate-400 "
      >
        What is on your mind?
      </button>
      {showPopoverCreatePost && (
        <PopoverCreatePost
          onClosePopover={() =>
            setShowPopoverCreatePost(!showPopoverCreatePost)
          }
        />
      )}
    </div>
  );
}
