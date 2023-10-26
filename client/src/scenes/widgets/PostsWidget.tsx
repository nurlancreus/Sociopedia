import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectToken, setPosts } from "@/state";
import { useGetPostsQuery } from "@/state/api";

import PostWidget from "./PostWIdget";
import Spinner from "@/components/Spinner";

type PostsWidgetProps = { userId: string; isProfile?: boolean };

export default function PostsWidget({
  userId,
  isProfile = false,
}: PostsWidgetProps) {
  const token = useSelector(SelectToken)!;
  const { data: posts, isLoading } = useGetPostsQuery({
    userId: isProfile ? userId : undefined,
    token,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(posts));
  }, [dispatch, posts]);

  if (!posts && isLoading) return <Spinner />;

  const orderedPosts = posts
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      {orderedPosts?.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </>
  );
}
