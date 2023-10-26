import { Typography, Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { WidgetWrapper } from "@/components/WidgetWrapper";
import Friend from "@/components/Friend";
import { SelectFriends } from "@/state";

export default function FriendListWidget() {
  const theme = useTheme();

  const friends = useSelector(SelectFriends);

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
