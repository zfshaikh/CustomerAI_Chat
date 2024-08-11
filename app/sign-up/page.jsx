
// app/sign-up/page.jsx
"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/configFirebase"; // Adjust the import path as needed

export default function AuthPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setError(""); // Clear error when switching tabs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      if (selectedTab === 0) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/chat-home"); // Redirect to chat page
      } else {
        // Sign Up
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/chat-home"); // Redirect to chat page
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "lightblue",
        backgroundImage: "url(/robot.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Tabs value={selectedTab} onChange={handleTabChange} >
        <Tab label="Login" sx={{ fontSize: '15px',fontWeight: 'bold' }} />
        <Tab label="Sign Up" sx={{ fontSize: '15px', fontWeight: 'bold' }} />
      </Tabs>

      <Stack
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          width: { xs: "100%", sm: "450px" },
          borderRadius: "20px",
          marginTop: 17,
          boxShadow: 8,
          p: 3,
        }}
      >
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {selectedTab === 0 && (
          // Content for Login tab
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{
              alignItems: 'center', // Centers children horizontally
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "22px",
                mb: 2,
                textAlign: "center",
                color: "#002884",
              }}
            >
              Login
            </Typography>

            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, width: '30%', height: '48px'}}
            >
              Login
            </Button>
          </Stack>
        )}

        {selectedTab === 1 && (
          // Content for Sign Up tab
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{
              alignItems: 'center', // Centers children horizontally
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "22px",
                mb: 2,
                textAlign: "center",
                color: "#002884",
              }}
            >
              Sign Up
            </Typography>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, width: '30%', height: '48px'}}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
