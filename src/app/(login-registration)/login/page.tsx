'use client';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import {
  signIn,
} from 'next-auth/react';
import Logo from '../../../components/Logo';

type LoginProps = {
  searchParams?: Record<'callbackUrl' | 'error', string>;
};

const Login = ({ searchParams }: LoginProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await signIn('credentials', {
      username: data.get('email'),
      password: data.get('password'),
      redirect: true,
      callbackUrl: searchParams?.callbackUrl ?? '/',
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Logo />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/registration" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {searchParams?.error && (
        <Alert severity="error">Unauthorized: Incorrect Credentials</Alert>
      )}
    </Container>
  );
};

export default Login;
