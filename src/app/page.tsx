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

const authServer = process.env.NEXT_PUBLIC_AUTH_SERVER;
const webserver = process.env.NEXT_PUBLIC_WEB_SERVER;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const defaultTheme = createTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      window.location.href = `${webserver}/private/index.html`;
    } catch (error) {
      console.log(error);
      alert("ログインに失敗しました");
    }
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              type="text"
              id="username"
              label="Username"
              variant="filled"
              fullWidth
              margin="normal"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
