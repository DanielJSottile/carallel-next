'use client';

import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import Logo from '../../../components/Logo';

const Registration = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${process.env.NEXT_PUBLIC_APP_API_KEY}`
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          user_name: email,
          password,
        }),
      })

      if (response.ok) {
        router.push('/');
      }
    } catch (e) {
      setError(error)
    }

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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                helperText={firstName ? '' : 'First Name is required'}
                error={!firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                helperText={firstName ? '' : 'Last Name is required'}
                error={!lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  const isValid =
                    // eslint-disable-next-line security/detect-unsafe-regex
                    /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(
                      e.target.value
                    );
                  setIsEmailValid(isValid);
                  setEmail(e.target.value);
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={isEmailValid ? '' : 'Must be a valid email address'}
                error={!isEmailValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  const isValid =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-=|])[\S]{12,}$/.test(
                      e.target.value
                    );
                  setIsPasswordValid(isValid);
                  setPassword(e.target.value);
                }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText={
                  isPasswordValid
                    ? ''
                    : 'Password must contain 12 characters, a number, upper and lowercase letter, and a special symbol'
                }
                error={!isPasswordValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setVerifyPassword(e.target.value)}
                required
                fullWidth
                name="verify-password"
                label="Verify Password"
                type="password"
                id="verify-password"
                autoComplete="new-password"
                helperText={
                  password === verifyPassword && verifyPassword
                    ? ''
                    : 'Must match password'
                }
                error={password !== verifyPassword || !verifyPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              !(
                password === verifyPassword &&
                password &&
                verifyPassword &&
                firstName &&
                lastName &&
                email &&
                isPasswordValid &&
                isEmailValid
              )
            }
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">{error}</Alert>
      )}
    </Container>
  );
};

export default Registration;
