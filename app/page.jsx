// app/page.jsx
"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'lightblue',
        backgroundImage: 'url(/robot.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          color: '#002884',
          textAlign: 'center',
        }}
      >
        Welcome to LingoMate AI
      </Typography>
      <Button
        variant="contained"
        onClick={handleSignUp}
        sx={{
          backgroundColor: '#002884',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#001e3c',
          },
        }}
      >
        Log In or Sign Up
      </Button>
    </Box>
  );
}
