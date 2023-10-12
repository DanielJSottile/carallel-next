'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

const LoginButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Box>
        <Typography>{session.user.name}</Typography>
        <Button
          onClick={() => signOut()}
          sx={{
            ml: 1,
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
    <Box>
      <Button
      href="/registration"
      sx={{
        ml: 1,
        backgroundColor: 'secondary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'secondary.light',
          color: 'black',
        },
      }}
    >
      Register
    </Button>

    <Button
      href="/login"
      sx={{
        ml: 1,
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
    
    </Box>
    
  );
};

export default LoginButton;
