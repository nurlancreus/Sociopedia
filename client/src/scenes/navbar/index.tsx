import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
} from "@mui/icons-material";
import { setMode, setLogout, SelectUser } from "@/state";
import { FlexBetween } from "@/components/FlexBetween";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;

  const dispatch = useDispatch();
  const user = useSelector(SelectUser);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <FlexBetween p="1rem 6%" sx={{ backgroundColor: alt }}>
      <FlexBetween gap="2rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNonMobile && (
          <FlexBetween
            p="0.1rem 1.5rem"
            gap="3rem"
            borderRadius="9px"
            sx={{ backgroundColor: neutralLight }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop Nav */}
      {isNonMobile ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ color: dark, fontSize: "25px", cursor: "pointer" }} />
          <Notifications
            sx={{ color: dark, fontSize: "25px", cursor: "pointer" }}
          />
          <Help sx={{ color: dark, fontSize: "25px", cursor: "pointer" }} />
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
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
          <Menu />
        </IconButton>
      )}

      {/* Mobile Screens */}
      {!isNonMobile && (
        <MobileNav
          isMobileMenuToggled={isMobileMenuToggled}
          setIsMobileMenuToggled={setIsMobileMenuToggled}
        />
      )}
    </FlexBetween>
  );
}
