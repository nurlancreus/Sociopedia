import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FlexBetween } from "@/components/FlexBetween";
import { WidgetWrapper } from "@/components/WidgetWrapper";
import Friend from "@/components/Friend";
import { SelectToken, SelectUser, setPost } from "@/state";
import { useUpdateLikeMutation } from "@/state/api";
import { type PostType } from "@/state/types";

type PostWidgetProps = { post: PostType };

export default function PostWIdget({ post }: PostWidgetProps) {
  const {
    _id: postId,
    userId: postUserId,
    picturePath,
    firstName,
    lastName,
    userPicturePath,
    location,
    description,
    likes,
    comments,
  } = post;

  const fullName = `${firstName} ${lastName}`;

  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(SelectToken)!;
  const { _id: loggedInUserId } = useSelector(SelectUser)!;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [updateLike] = useUpdateLikeMutation();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const updatedPost = await updateLike({
        postId,
        loggedInUserId,
        token,
      }).unwrap();
      
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={fullName}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${fullName}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}
