import { useEffect } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { WidgetWrapper } from "@/components/WidgetWrapper";
import Friend from "@/components/Friend";
import { SelectToken, setFriends } from "@/state";
import { useGetFriendsQuery } from "@/state/api";

type FriendListWidgetProps = { userId: string };

export default function FriendListWidget({ userId }: FriendListWidgetProps) {
  const theme = useTheme();
  const token = useSelector(SelectToken)!;
  const dispatch = useDispatch();
  const { data: friends } = useGetFriendsQuery({ userId, token });

  useEffect(() => {
    if (friends) {
      dispatch(setFriends(friends));
    }
  }, [friends, dispatch]);

  if (!friends?.length) return null;

  return (
    <WidgetWrapper>
      <Typography
        color={theme.palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}
