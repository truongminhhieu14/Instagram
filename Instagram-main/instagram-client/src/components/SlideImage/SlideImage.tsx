"use client";

import ChevronLeft from "@/Icon/chevronLeft";
import ChevronRight from "@/Icon/chevronRight";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import CloseIcon from "@/Icon/closeIcon";

type Props = {
  preview: string[];
  setSelectedFile?: () => void;
  setPreview?: () => void;
};
export default function SlideImage({
  preview,
  setSelectedFile,
  setPreview,
}: Props) {
  const [index, setIndex] = useState(0);
  return (
    <div className="relative">
      <ChevronLeft
        onClick={() => {
          if (index === 0) return;
          setIndex(index - 1);
        }}
        className={clsx(
          "w-6 h-6 absolute left-0 top-1/2 rounded-full bg-white text-black",
          {
            "text-gray-400 cursor-not-allowed": index === 0,
          }
        )}
      />
      <Image
        alt="photo"
        src={preview[index]}
        width={50}
        height={100}
        className="w-full h-full max-h-[300px] object-scale-down"
      />
      <ChevronRight
        onClick={() => {
          if (index === preview.length - 1) return;
          setIndex(index + 1);
        }}
        className={clsx(
          "w-6 h-6 rounded-full bg-white absolute right-0 top-1/2 text-black",
          {
            "text-gray-400 cursor-not-allowed": index === preview.length - 1,
          }
        )}
      />
      <CloseIcon
        className="w-6 h-6 rounded-full bg-white absolute top-3 right-3 cursor-pointer"
        onClick={() => {
          setPreview;
          setSelectedFile;
        }}
      />
    </div>
  );
}
