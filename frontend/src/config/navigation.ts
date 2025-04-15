// app/config/navigation.ts
export interface NavItem {
    label: string;
    href: string;
    isButton: boolean;
  }
  
  export const NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '/', isButton: false },
    { label: 'About', href: '/about', isButton: false },
    { label: 'Contact', href: '/contact', isButton: false },
    { label: 'Book Appointment', href: '/doctors', isButton: true }
  ];