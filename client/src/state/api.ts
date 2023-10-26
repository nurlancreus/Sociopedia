import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FriendType, type PostType, type UserType } from "./types";
import { ValuesLoginType } from "@/scenes/loginPage/LoginForm";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "user",
  tagTypes: ["Auth", "Users", "Friends", "Posts"],
  endpoints: (build) => ({
    authRegister: build.mutation<UserType, { formData: FormData }>({
      query: (params) => ({
        url: `auth/register`,
        method: "POST",
        body: params.formData,
      }),
      invalidatesTags: ["Auth"],
    }),
    authLoggingIn: build.mutation<
      { user: UserType; token: string },
      { values: ValuesLoginType }
    >({
      query: (params) => ({
        url: `auth/login`,
        method: "POST",
        body: JSON.stringify(params.values),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: build.query<UserType, { userId: UserType["_id"]; token: string }>({
      query: (params) => ({
        url: `users/${params.userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }),
      providesTags: ["Users"],
    }),
    getFriends: build.query<
      Array<FriendType>,
      { userId: UserType["_id"]; token: string }
    >({
      query: (params) => ({
        url: `users/${params.userId}/friends`,
        method: "GET",
        headers: { Authorization: `Bearer ${params.token}` },
      }),
      providesTags: ["Friends"],
    }),
    getPosts: build.query<
      Array<PostType>,
      { userId?: UserType["_id"]; token: string }
    >({
      query: (params) => ({
        url: params.userId ? `posts/${params.userId}/posts` : `posts/`,
        method: "GET",
        headers: { Authorization: `Bearer ${params.token}` },
      }),
      providesTags: ["Posts"],
    }),
    addPost: build.mutation<
      Array<PostType>,
      { formData: FormData; token: string }
    >({
      query: (params) => ({
        url: `posts`,
        method: "POST",
        body: params.formData,
        headers: { Authorization: `Bearer ${params.token}` },
      }),
      invalidatesTags: ["Posts"],
    }),
    updateLike: build.mutation<
      PostType,
      {
        postId: PostType["_id"];
        loggedInUserId: UserType["_id"];
        token: string;
      }
    >({
      query: (params) => ({
        url: `posts/${params.postId}/like`,
        method: "PATCH",
        body: JSON.stringify({ userId: params.loggedInUserId }),
        headers: {
          Authorization: `Bearer ${params.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    updateFriend: build.mutation<
      Array<FriendType>,
      { userId: UserType["_id"]; friendId: FriendType["_id"]; token: string }
    >({
      query: (params) => ({
        url: `users/${params.userId}/${params.friendId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${params.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Friends"],
    }),
  }),
});

export const {
  useAuthRegisterMutation,
  useAuthLoggingInMutation,
  useGetUserQuery,
  useGetFriendsQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdateLikeMutation,
  useUpdateFriendMutation,
} = api;
