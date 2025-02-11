"use client";
import PhoneIcon from "@/Icon/phoneIcon";
import SmileIcon from "@/Icon/smile";
import ThreeDotIcon from "@/Icon/threeDotIcon";
import VideoCallIcon from "@/Icon/videoCallIcon";
import MessageSentFromFriend from "@/components/MessageSent/FromFriend/MessageSentFromFriend";
import MessageSentFromMe from "@/components/MessageSent/FromMe/MesseageSentFormMe";
import Image from "next/image";
import Link from "next/link";
import SerachForMessage from "@/components/SearchForMessage";
import { useMessageContext } from "../context";

export default function MessagePersonal() {
  const { showPopoverSearchMessage, onClosePopover } = useMessageContext();
  return (
    <div className="flex flex-col ml-auto w-3/4 bg-white overflow-hidden">
      <div className=" sticky top-0 w-full p-4 flex items-center justify-between border-b boder-slate-300">
        <Link href="/1longg" className="flex items-center">
          <Image
            alt="avatar"
            width={40}
            height={40}
            src="/at.jpg"
            className="w-10 h-10 rounded-full mr-2 object-fill"
          />
          <p className="text-sm font-semibold">1longg</p>
        </Link>
        <div className="flex items-center cursor-pointer">
          <PhoneIcon className="w-6 h-6 mr-4" />
          <VideoCallIcon className="w-6 h-6 mr-4" />
          <ThreeDotIcon className="w-6 h-6 " />
        </div>
      </div>
      <div className="overflow-y-scroll py-4 mt-auto h-full flex flex-col-reverse">
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromMe />
        <MessageSentFromMe />
        <MessageSentFromFriend />
        <MessageSentFromFriend />
      </div>
      <div className="p-4 w-full bg-white">
        <div className="border rounded-3xl p-2 flex items-center border-slate-300">
          <SmileIcon className="w-6 h-6 mr-2" />
          <input
            type="text"
            placeholder="Type a message"
            className="w-full outline-none"
          />
          <button className="text-blue-500 font-semibold outline-none p-2">
            Send
          </button>
        </div>
      </div>

      {showPopoverSearchMessage && (
        <SerachForMessage onClosePopover={onClosePopover} />
      )}
    </div>
  );
}
