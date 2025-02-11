"use client";
import CommentIcon from "@/Icon/commentIcon";
import HeartIcon from "@/Icon/heartIcon";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../Spinner/Spinner";
import NoPostYet from "../NoPostYet/NoPostYet";
import { SuccessGetPostInProfile } from "@/app/_type/profile.type";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProfileApi } from "@/app/_api/profile.api";

type Props = {
  initialData: SuccessGetPostInProfile;
};

export default function InfinitePost({ initialData }: Props) {
  const [post, setPost] = useState(initialData.data);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  async function loadMorePost() {
    const next = page + 1;
    const newPosts = await ProfileApi.getPostByUserId(
      "90087c59-5760-4c42-90f2-8ce37f7e1fe8",
      next.toString()
    );
    if (newPosts.data.hasMore === true) {
      setPage(next);
      setPost((prev) => [...prev, ...newPosts.data.data]);
    } else {
      setHasMore(newPosts.data.hasMore);
    }
  }
  useEffect(() => {
    if (inView) {
      loadMorePost();
    }
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-3 gap-1 mb-4 w-full">
        {post ? (
          post.map((post) => (
            <Link
              href={`/post/${post.post_post_id}`}
              className="col-span-1 cursor-pointer relative group"
              key={post.post_post_id}
            >
              <div className="group-hover:flex hidden w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 justify-center items-center">
                <div className="flex items-center mr-4">
                  <HeartIcon className="w-6 h-6 mr-1 text-white fill-white" />
                  <p className="text-white text-sm">{post.number_of_likes}</p>
                </div>

                <div className="flex items-center">
                  <CommentIcon className="w-6 h-6 mr-1 text-white fill-white" />
                  <p className="text-white text-sm">
                    {post.number_of_comments}
                  </p>
                </div>
              </div>
              <Image
                src={post.post_photo[0]}
                alt="check"
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
              />
            </Link>
          ))
        ) : (
          <NoPostYet className=" col-span-full mt-4 flex items-center flex-col" />
        )}
        {hasMore && (
          <div ref={ref} className="col-span-full flex justify-center mt-6">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
