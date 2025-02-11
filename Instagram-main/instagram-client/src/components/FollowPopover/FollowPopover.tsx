"use client";
import CloseIcon from "@/Icon/closeIcon";
import SearchIcon from "@/Icon/searchIcon";
import UserCompact from "@/components/UserCompact/UserCompact";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect, useRef } from "react";
type Props = {
  className?: string;
};

export default function FollowPopover({ className }: Props) {
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
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
      className="bg-white w-1/4 h-2/3 border rounded-xl overflow-hidden"
      ref={divRef}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          router.back();
        }
      }}
    >
      <div className="w-full border-b border-slate-300 py-2 relative mb-2">
        <p className="text-md font-semibold text-center">Followers</p>
        <button
          onClick={() => router.back()}
          className=" absolute top-2 right-2 cursor-pointer text-black"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="px-4 h-full overflow-y-scroll">
        <div className="px-3 bg-inherit w-full border rounded-md bg-slate-100 flex items-center text-sm ">
          <SearchIcon className="w-6 h-6 text-slate-400 mr-2" />
          <input
            placeholder="Search"
            className="w-full outline-none font-light py-2 bg-slate-100 "
          />
        </div>
        <div className="">
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
          <UserCompact className="flex justify-between mt-3" />
        </div>
      </div>
    </div>
  );
}
