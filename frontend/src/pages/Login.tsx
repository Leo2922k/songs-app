// src/pages/Login.tsx
import { useState } from "react";
import api from "../api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "../pages/layout";
import logo from "../assets/signin.png"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      alert("Login successful!");
      window.location.href = "/add-song";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-dvh">
        <div className="p-8 border rounded-md shadow-md w-80">
          <div className="flex items-center justify-center gap-4">
            <img src={logo} alt="signin" className="h-30 w-30 object-contain" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
          <Input
            placeholder="Username"
            className="mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            className="mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </Layout>
  );
}
