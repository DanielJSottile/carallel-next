import Image from 'next/image';
import { Box, Typography, Link } from '@mui/material';

const Logo = () => {
  return (
    <Box>
      <Link
        href="/"
        margin="auto"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ textDecoration: 'none', fontStyle: 'italic' }}
      >
        <Image
          src="/FuxNews.png"
          alt="logo"
          width={200}
          height={200}
          priority
        />
        <Typography fontWeight={500}>
          When it comes to news integrity, we don&apos;t give any Fux.
        </Typography>
      </Link>
    </Box>
  );
};

export default Logo;
