'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';

const LoginButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Box>
        <Typography>{session.user.name}</Typography>
        <Button
          onClick={() => signOut()}
          sx={{
            backgroundColor: 'secondary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'secondary.light',
              color: 'black',
            },
          }}
        >
          Sign Out
        </Button>
      </Box>
    );
  }
  return (
    <Button
      href="/login"
      sx={{
        backgroundColor: 'secondary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'secondary.light',
          color: 'black',
        },
      }}
    >
      Sign In
    </Button>
  );
};

export default LoginButton;
