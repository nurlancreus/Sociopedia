import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { SelectToken } from "@/state";

export default function LoginPage() {
  const theme = useTheme();
  const isAuth = useSelector(SelectToken);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [pageType, setPageType] = useState<"login" | "register">("login");
  const isLogin = pageType === "login";

  if (isAuth) return <Navigate replace to="/" />;

  return (
    <Box height="100vh">
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", color: theme.palette.primary.main }}
        >
          Welcome to Sociopedia, the Social Media for Sociopaths!
        </Typography>
        {isLogin ? <LoginForm /> : <RegisterForm setPageType={setPageType} />}
        <Typography
          onClick={() => {
            setPageType(isLogin ? "register" : "login");
          }}
          sx={{
            textDecoration: "underline",
            color: theme.palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              opacity: "0.8",
              transition: "0.2s all ease",
            },
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </Typography>
      </Box>
    </Box>
  );
}
