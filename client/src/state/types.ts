export type CustomBlob = Blob & { name: string };

export type InitialStateType = {
  mode: "dark" | "light";
  user: null | UserType;
  token: null | string;
  posts: Array<PostType>;
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: Array<FriendType>;
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PostType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Record<UserType["_id"], boolean>;
  comments: Array<string>;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type FriendType = Pick<
  UserType,
  "_id" | "firstName" | "lastName" | "occupation" | "location" | "picturePath"
>;
