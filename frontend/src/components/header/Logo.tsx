'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

export const Logo = () => (
  <Box 
    component={Link} 
    href="/" 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      textDecoration: 'none',
      gap: 1, 
    }}
  >
    <Box sx={{ 
      width: 80, 
      height: 80, 
      position: 'relative',
    }}>
      <Image 
        src="/logo.png"
        alt="HealthGate Logo"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </Box>
    <Typography
      variant="h6"
      noWrap
      className={poppins.className}
      sx={{
        marginLeft: -3,
        fontWeight: 600,
        color: '#71C9CE', 
        textDecoration: 'none',
      }}
    >
      HealthGate
    </Typography>
  </Box>
);