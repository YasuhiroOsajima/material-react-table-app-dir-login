"use client";
import { useState } from "react";

import axios from "axios";
import {
  createTheme,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

const authServer = process.env.NEXT_PUBLIC_AUTH_SERVER;
const webserver = process.env.NEXT_PUBLIC_WEB_SERVER;

export default function Login() {
  const defaultTheme = createTheme();

  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm();

  const handleLoginSubmit = async (username: string, password: string) => {
    try {
      const response = await axios({
        url: `${authServer}/api/login`,
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
      });

      console.log(response);
      window.location.href = `${webserver}/index.html`;
    } catch (error) {
      console.log(error);
      setAuthError("ユーザ名またはパスワードが違います");
    }
  };

  const onSubmit = (event: any): void => {
    handleLoginSubmit(event.username, event.password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            {authError && (
              <Typography variant="h5" color="error">
                {authError}
              </Typography>
            )}{" "}
            <TextField
              required
              type="text"
              id="username"
              label="Username"
              variant="filled"
              fullWidth
              margin="normal"
              {...register("username", {
                required: "必須項目です",
              })}
              error={Boolean(errors.username)}
              helperText={errors.username?.message?.toString() || ""}
            />
            <TextField
              required
              type="password"
              id="password"
              label="Password"
              variant="filled"
              autoComplete="current-password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "必須項目です",
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上です",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message?.toString() || ""}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={!isDirty}
            >
              ログイン
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
