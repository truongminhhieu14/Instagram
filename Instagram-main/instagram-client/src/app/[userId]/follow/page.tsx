import CloseIcon from "@/Icon/closeIcon";
import SearchIcon from "@/Icon/searchIcon";
import UserCompact from "@/components/UserCompact/UserCompact";

export default function Follow() {
  console.log('modal')
  return (
    <div className="relative w-screen h-screen py-8 bg-black bg-opacity-55 flex justify-center items-center z-30">
      <div className="bg-white w-1/4 h-2/3 border rounded-xl overflow-hidden">
        <div className="w-full border-b border-slate-300 py-2 relative mb-2">
          <p className="text-md font-semibold text-center  ">Followers</p>
          <CloseIcon className="w-6 h-6 absolute top-2 right-2 cursor-pointer text-black" />
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
    </div>
  );
}