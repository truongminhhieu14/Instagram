import CloseIcon from "@/Icon/closeIcon";
import UserCompact from "@/components/UserCompact/UserCompact";
import Modal from "../Modal";
type Props = {
  className?: string;
  onClosePopover: () => void;
};

export default function LikeOfPost({ className, onClosePopover }: Props) {
  return (
    <Modal>
      <div className="bg-white w-1/4 h-2/3 border rounded-xl overflow-hidden">
        <div className="w-full border-b border-slate-300 py-2 relative mb-2">
          <p className="text-md font-semibold text-center">Likes</p>
          <button className=" absolute top-2 right-2 cursor-pointer text-black" onClick={onClosePopover}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="px-4 h-full overflow-y-scroll">
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
    </Modal>
  );
}
