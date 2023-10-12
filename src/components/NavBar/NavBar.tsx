import { AppBar, Toolbar, Box, Link } from '@mui/material';
// import Header from '../Header';
import Image from 'next/image';
import LoginButton from '../LoginButton';

const NavBar = () => (
  <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link href="/">
        <Image src="/FuxNews.png" alt="logo" width={75} height={75} priority />
      </Link>
      <Box>
        <LoginButton />
      </Box>
    </Toolbar>
  </AppBar>
);

export default NavBar;
