import Navbar from "../navbar";
import { useSelector } from "react-redux";
import UserWidget from "@/scenes/widgets/UserWidget";
import MyPostWidget from "@/scenes/widgets/MyPostWIdget";
import PostsWidget from "@/scenes/widgets/PostsWidget";
import AdvertWidget from "@/scenes/widgets/AdvertWidget";
import FriendListWidget from "@/scenes/widgets/FriendListWidget";
import { Box, useMediaQuery } from "@mui/material";
import { SelectUser } from "@/state";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const user = useSelector(SelectUser);

  if (!user) return <Spinner />;

  const { _id, picturePath } = user;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined} position={isNonMobile ? "sticky" : "static"} top="2rem">
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobile && (
          <Box flexBasis="26%" position={isNonMobile ? "sticky" : "static"} top="2rem">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
