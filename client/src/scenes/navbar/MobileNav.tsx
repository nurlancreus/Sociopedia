import { Close, DarkMode, LightMode, Notifications, Help, Message } from "@mui/icons-material";
import { Box, IconButton, FormControl, Select, InputBase, MenuItem, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { FlexBetween } from "@/components/FlexBetween";
import { SelectUser, setMode, setLogout } from "@/state";

type MobileNavProps = {
  isMobileMenuToggled: boolean;
  setIsMobileMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileNav({
  isMobileMenuToggled,
  setIsMobileMenuToggled,
}: MobileNavProps) {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;

  const dispatch = useDispatch();
  const user = useSelector(SelectUser);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: "0",
          backgroundColor: "#000",
          opacity: isMobileMenuToggled ? "0.2" : "0",
          visibility: isMobileMenuToggled ? "visible" : "hidden",
          transition: "all 0.3s ease",
          zIndexL: "5",
        }}
        onClick={() => setIsMobileMenuToggled(false)}
      />
      <Box
        position="fixed"
        right="0"
        bottom="0"
        top="0"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        sx={{
          backgroundColor: background,
          transform: isMobileMenuToggled ? "translateX(0)" : "translateX(100%)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Close Icon */}
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <IconButton onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
            <Close />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <FlexBetween
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="3rem"
        >
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "25px" }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ color: dark, fontSize: "25px" }} />
          <Notifications sx={{ color: dark, fontSize: "25px" }} />
          <Help sx={{ color: dark, fontSize: "25px" }} />
          <FormControl variant="standard" component="div">
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      </Box>
    </>
  );
}
