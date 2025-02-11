import CloseIcon from "@/Icon/closeIcon";
import Modal from "../Modal";
import UserMessage from "../UserMessage/UserMessage";
type Props = {
  onClosePopover: () => void;
}

export default function SerachForMessage({ onClosePopover }: Props) {
  return (
    <Modal>
      <div className="bg-white w-1/3 h-2/3  border rounded-xl overflow-hidden">
        <div className="w-full border-b border-slate-300 py-2 relative">
          <p className="text-md font-semibold text-center">New Message</p>
          <button className=" absolute top-2 right-2 cursor-pointer text-black" onClick={onClosePopover}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full border-b border-slate-300 py-2 px-3 relative flex items-center">
          <p className="text-base font-semibold mr-3">To:</p>
          <input
            placeholder="Search..."
            className="outline-none text-slate-400 text-sm p-1"
          />
        </div>
        <div className="w-full h-full p-2 overflow-y-scroll">
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
          <UserMessage className="flex items-center justify-between mb-4" />
        </div>
      </div>
    </Modal>
  );
}
