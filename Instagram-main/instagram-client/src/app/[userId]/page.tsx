"use client";

import Footer from "@/components/Footer";
import InfinitePost from "@/components/InfinitePost/InfinitePost";
import SideBar from "@/components/SideBar";
import { useQueries, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ProfileApi } from "../_api/profile.api";

type Props = {
  className?: string;
  params: { userId: string };
};

export default function Profile({ className, params }: Props) {
  const [ProfileQuery, PostQuery] = useQueries({
    queries: [
      {
        queryKey: ["profile"],
        queryFn: async () =>
          ProfileApi.getProfile("90087c59-5760-4c42-90f2-8ce37f7e1fe8"),
      },
      {
        queryKey: ["initialPost"],
        queryFn: async () => {
          return await ProfileApi.getPostByUserId(
            "90087c59-5760-4c42-90f2-8ce37f7e1fe8",
            "0"
          );
        },
      },
    ],
  });
  if (ProfileQuery.isLoading) return <div>Loading...</div>;
  if (ProfileQuery.isSuccess && PostQuery.isSuccess) {
    const data = ProfileQuery.data.data.data;
    return (
      <div className="py-8 h-screen overflow-x-hidden">
        <SideBar className="h-screen fixed left-0 top-0 z-10 border-r-2 w-60 py-8 px-4 bg-white" />
        <div className="flex flex-col">
          <div className="w-[calc(100%_-_240px)] h-full min-h-[700px] ml-auto flex justify-center">
            <div className="w-2/3">
              <div className="flex px-16 mb-6">
                <Image
                  src={data.userProfile.avatar}
                  width={150}
                  height={150}
                  alt="avatar"
                  className="w-[150px] h-[150px] mr-16 object-fill border rounded-full"
                />
                <div className="">
                  <div className="flex items-center mb-8">
                    <p className="text-md font-semibold mr-4"></p>
                    <button className="border rounded-md px-3 py-1 bg-slate-300 font-medium text-sm mr-4">
                      Edit Profile
                    </button>
                    <button className="border rounded-md px-3 py-1 bg-slate-300 font-medium text-sm mr-4">
                      View Archie
                    </button>
                  </div>
                  <div className="flex mb-8">
                    <div className="mr-5 flex">
                      <p className="font-semibold mr-2">{data.numberOfPost}</p>{" "}
                      Posts
                    </div>
                    <Link href="/1longg/follow" className="mr-5 flex">
                      <p className="font-semibold mr-2">
                        {data.numberOfFollowers}
                      </p>{" "}
                      Followers
                    </Link>
                    <div className="flex">
                      <p className="font-semibold mr-2">
                        {data.numberOfFollowings}
                      </p>{" "}
                      Followings
                    </div>
                  </div>
                  <div className="text-sm">{data.userProfile.bio}</div>
                </div>
              </div>

              <div className="h-[1px] bg-slate-300 w-full mt-16 mb-4"></div>
              <InfinitePost initialData={PostQuery.data.data} />
            </div>
          </div>
        </div>
        <div className="w-[calc(100%_-_240px)] ml-auto">
          <Footer />
        </div>
      </div>
    );
  }
}
