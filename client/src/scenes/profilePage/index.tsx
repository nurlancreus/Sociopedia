import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import FriendListWidget from "@/scenes/widgets/FriendListWidget";
import MyPostWidget from "@/scenes/widgets/MyPostWIdget";
import PostsWidget from "@/scenes/widgets/PostsWidget";
import UserWidget from "@/scenes/widgets/UserWidget";
import Spinner from "@/components/Spinner";
import { SelectToken } from "@/state";
import { useGetUserQuery } from "@/state/api";

export default function ProfilePage() {
  const { userId } = useParams() as Record<string, string>;
  const token = useSelector(SelectToken)!;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { data: user, isLoading } = useGetUserQuery({ userId, token });

  if (!user || isLoading) return <Spinner />;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
}
