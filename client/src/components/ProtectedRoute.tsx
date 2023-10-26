import { SelectToken } from "@/state";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function ProtectedRoute() {
  const isAuth = useSelector(SelectToken);

  const navigate = useNavigate();
  const pathname = window.location.pathname;

  useEffect(() => {
    if (!isAuth) {
      if (pathname !== "/" && pathname !== "/home") {
        navigate(
          `/login?redirectTo=${pathname}&message=Please, first log in, then try again`
        );
      } else navigate("/login");
    }
  }, [pathname, navigate, isAuth]);

  if (!isAuth) return <Spinner />;

  return <Outlet />;
}
