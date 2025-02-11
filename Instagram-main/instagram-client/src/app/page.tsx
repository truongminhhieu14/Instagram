import CreatePost from "@/components/CreatePost/CreatePost";
import Post from "@/components/Post/Post";
import SideBar from "@/components/SideBar";
import SuggestFollow from "@/components/SuggestFollow";

export default function Home() {

  return (
    <div className="flex overflow-x-hidden h-screen">
      <SideBar className="h-screen fixed left-0 top-0 z-10 border-r-2 w-60 px-4 py-8 bg-white" />
      <div className="flex w-[calc(100%_-_240px)] justify-center ml-auto ">
        <div className="w-2/4 ml-16 px-16 py-4">
          <CreatePost className="border rounded-xl p-2 flex items-center w-full mb-8" />
          <Post className="mb-6" />
          <Post className="mb-6" />
          <Post className="mb-6" />
          <Post className="mb-6" />
          <Post className="mb-6" />
          <Post className="mb-6" />
          <Post className="mb-6" />
        </div>
        <SuggestFollow className="w-1/4 ml-6 py-6 h-[500px]" />
      </div>
    </div>
  );
}
