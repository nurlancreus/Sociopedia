import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectToken, SelectUser, setFriends } from "@/state";
import { FlexBetween } from "./FlexBetween";
import UserImage from "./UserImage";
import { useUpdateFriendMutation } from "@/state/api";

type FriendProps = {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
};

export default function Friend({
  friendId,
  name,
  subtitle,
  userPicturePath,
}: FriendProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id: userId, friends } = useSelector(SelectUser)!;
  const token = useSelector(SelectToken)!;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = Boolean(friends.find((friend) => friend._id === friendId));

  const [updateFriend] = useUpdateFriendMutation();

  const patchFriend = async () => {
    try {
      if (userId === friendId) return;

      const friendsData = await updateFriend({
        userId,
        friendId,
        token,
      }).unwrap();

      console.log(friendsData)

      dispatch(setFriends(friendsData));
    } catch (error) {
      console.log(error);
    }
  };

  // const patchFriend = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/users/${userId}/${friendId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) throw Error();
  //     const data = await response.json();
  //     dispatch(setFriends(data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <FlexBetween>
      <FlexBetween
        gap="1rem"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/profile/${friendId}`)}
      >
        <UserImage image={userPicturePath} size="55px" />
        <Box>
          <Typography color={main} variant="h5" fontWeight="500">
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {userId !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}
