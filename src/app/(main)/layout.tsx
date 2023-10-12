'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import NavBar from '../../components/NavBar';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <main>
    <NavBar />
    <Box mt={{ xs: '100px', sm: '80px' }}>{children}</Box>
  </main>
);

export default DashboardLayout;
