"use client";
import { useState } from "react";

const authServer = "http://192.168.33.13:9999";
const webserver = "http://192.168.33.13";

export default function Login() {
  const [username, setUsername] = useState("");
  const [passsword, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const responce = await fetch(`${authServer}/api/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          passsword: passsword,
        }),
        credentials: "include",
      });

      window.location.href = `${webserver}/private/index.html`;
    } catch (error) {
      console.log(error);
      alert("ログインに失敗しました");
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          value={passsword}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
