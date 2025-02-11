"use client";

import ImageIcon from "@/Icon/ImageIcon";
import CloseIcon from "@/Icon/closeIcon";
import Modal from "@/components/Modal";
import SlideImage from "@/components/SlideImage/SlideImage";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
type Props = {
  onClosePopover?: () => void;
};

export default function PopoverCreatePost({ onClosePopover }: Props) {
  const [selectedFile, setSelectedFile] = useState<File[] | undefined>();
  const [preview, setPreview] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = selectedFile.map((file) => URL.createObjectURL(file));
    setPreview(objectUrl);

    return () => objectUrl.forEach(URL.revokeObjectURL);
  }, [selectedFile]);
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const filesArray = Array.from(e.target.files);
    setSelectedFile(filesArray);
  };

  return (
    <Modal>
      <div className="bg-white w-1/3 h-2/3  border rounded-xl  relative overflow-hidden">
        <div className="w-full border-b border-slate-300 py-2 relative">
          <p className="text-lg font-bold text-center">Create post</p>
          <button
            className=" absolute top-2 right-2 cursor-pointer text-black"
            onClick={onClosePopover}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="h-full">
          <div className="flex py-2 px-4 items-center">
            <Image
              src="/at.jpg"
              width={40}
              height={40}
              alt="avatar"
              className="w-10 h-10 mr-4 rounded-full object-fill"
            />
            <p className="text-md font-semibold">1longg</p>
          </div>
          <div className="w-full py-2 px-3 relative h-1/2 overflow-hidden overflow-y-auto">
            <textarea
              placeholder="What's on your mind..."
              className="outline-none placeholder-slate-400 text-black text-sm p-1 w-full max-h-[100%] resize-none no-scrollbar"
            />
            {selectedFile && preview && (
              <SlideImage preview={preview} setSelectedFile={() => setSelectedFile(undefined)} setPreview={() => setPreview(undefined)}/>
            )}
          </div>
          <div className="w-full px-2 bg-white">
            <div className="mb-4">
              <label className="items-center flex border rounded-xl px-2 py-4 cursor-pointer">
                <ImageIcon className="w-8 h-8 fill-green-400 mr-4" />
                <p className="text-slate-600">Add photos to your post</p>
                <input
                  onChange={onSelectFile}
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  id="file-upload"
                  multiple
                  className="hidden"
                />
              </label>
            </div>
            <button className="bg-blue-500 w-full flex items-center justify-center rounded-2xl py-2 text-white">
              Post
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
