import { useEffect, useMemo } from "react";
import { themeSettings } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectMode } from "@/state";
import LoginPage from "@/scenes/loginPage";
import HomePage from "@/scenes/homePage";
import ProfilePage from "@/scenes/profilePage";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorPage from "@/scenes/errorPage";

export default function App() {
  const mode = useSelector(SelectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    if (mode === "dark") document.documentElement.className = "dark";
    if (mode === "light") document.documentElement.className = "light";
  }, [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<HomePage />} />
              <Route path="profile/:userId" element={<ProfilePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
