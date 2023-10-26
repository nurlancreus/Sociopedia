import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { setLogin } from "@/state";
import { useAuthLoggingInMutation } from "@/state/api";
import { useState } from "react";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "nurik@susano.com",
  password: "qwerty",
};

export type ValuesLoginType = typeof initialValuesLogin;

type customErr = {
  status: string;
  data: {
    msg: string;
  };
};

export default function LoginForm() {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState<customErr | null>(null);

  const [searchParams] = useSearchParams();
  const urlErrMsg = searchParams.get("message") || null;
  const redirect = searchParams.get("redirectTo") || null;

  const [loggingIn] = useAuthLoggingInMutation();

  const login = async (
    values: ValuesLoginType,
    onSubmitProps: FormikHelpers<ValuesLoginType>
  ) => {
    try {
      const loggedIn = await loggingIn({ values }).unwrap();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(setLogin(loggedIn.user, loggedIn.token));
        redirect ? navigate(redirect) : navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error as customErr);
    }
  };

  const errMessage = urlErrMsg ?? error?.data?.msg;

  const handleFormSubmit = async (
    values: ValuesLoginType,
    onSubmitProps: FormikHelpers<ValuesLoginType>
  ) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              autoComplete="on"
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              autoComplete="off"
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0 1.5rem",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                textTransform: "uppercase",
              }}
            >
              Login
            </Button>
            {errMessage && (
              <Typography color="red" variant="h5" mb="0rem">
                {errMessage}
              </Typography>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}
