'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/mui/theme';
import Providers from '../components/Providers';
import '../../styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      <Providers>
        <ThemeProvider theme={theme}>
         {children}
        </ThemeProvider>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
