import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type InitialStateType,
  type UserType,
  type PostType,
  type FriendType,
} from "./types";
import { type RootState } from "@/app/store";

const initialState: InitialStateType = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
};

const globalSlice = createSlice({
  initialState,
  name: "global",
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setLogin: {
      prepare: (user: UserType, token: string) => {
        return { payload: { user, token } };
      },
      reducer: (
        state,
        action: PayloadAction<{ user: UserType; token: string }>
      ) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: {
      prepare: (friends: Array<FriendType>) => {
        return { payload: { friends } };
      },
      reducer: (
        state,
        action: PayloadAction<{ friends: Array<FriendType> }>
      ) => {
        if (state.user) {
          state.user.friends = action.payload.friends;
        }
      },
    },
    setPosts: {
      prepare: (posts: Array<PostType>) => {
        return { payload: { posts } };
      },
      reducer: (state, action: PayloadAction<{ posts: Array<PostType> }>) => {
        state.posts = action.payload.posts;
      },
    },
    setPost: (state, action: PayloadAction<{ post: PostType }>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const SelectMode = (state: RootState) => state.global.mode;
export const SelectUser = (state: RootState) => state.global.user;
export const SelectToken = (state: RootState) => state.global.token;

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } =
  globalSlice.actions;
export default globalSlice.reducer;
