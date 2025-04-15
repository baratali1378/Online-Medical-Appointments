'use client';

import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { NavItem } from '../../config/navigation';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

interface DesktopNavigationProps {
  items: NavItem[];
}

// Link Factory
const createNavigationLink = (item: NavItem) => (
  <Box
    key={item.label}
    component={Link}
    href={item.href}
    className={montserrat.className}
    sx={{
      fontWeight: 500,
      fontSize: '0.95rem',
      color: 'text.secondary', // Using text.secondary here
      textDecoration: 'none',
      px: 1,
      py: 0.5,
      '&:hover': { color: '#71C9CE' },
      transition: 'color 0.2s ease'
    }}
  >
    {item.label}
  </Box>
);

// Button Factory
const createLoginButton = (type: 'patient' | 'doctor') => {
  const config = {
    patient: {
      href: '/patient-login',
      label: 'Patient Login',
      variant: 'outlined' as const,
      sx: {
        borderColor: '#E0E0E0',
        '&:hover': { borderColor: '#71C9CE', color: '#71C9CE' }
      }
    },
    doctor: {
      href: '/doctor-login',
      label: 'Doctor Login',
      variant: 'contained' as const,
      sx: {
        backgroundColor: '#71C9CE',
        '&:hover': { backgroundColor: '#5AB5BA', transform: 'translateY(-1px)' }
      }
    }
  };

  return (
    <Button
      variant={config[type].variant}
      component={Link}
      href={config[type].href}
      className={montserrat.className}
      sx={{
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '0.85rem',
        px: 2,
        py: 0.8,
        color: type === 'patient' ? 'text.secondary' : 'white', // Using text.secondary for patient login
        transition: 'all 0.2s ease',
        ...config[type].sx
      }}
    >
      {config[type].label}
    </Button>
  );
};

export const DesktopNavigation = ({ items }: DesktopNavigationProps) => (
  <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
    {/* Navigation Links - using text.secondary */}
    {items.map(createNavigationLink)}
    
    {/* Login Buttons */}
    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
      {createLoginButton('patient')}
      {createLoginButton('doctor')}
    </Box>
  </Box>
);