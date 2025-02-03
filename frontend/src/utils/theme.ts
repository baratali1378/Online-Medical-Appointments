import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

// Load the Roboto font
const roboto = Roboto({
    subsets: ['latin'],  // Loads only the necessary characters
    weight: ['300', '400', '500', '700'], // Specify the weights you need
    display: 'swap',
});

// Define your custom colors
const customColors = {
    primary: '#343434',
    secondary: '#71C9CE',
    info: "#CBF1F5",
    success: '#5CB338',
    error: '#FB4141',
    background: '#FFFFFF',
    text: '#FFFFFF',
};

// Create a custom MUI theme
const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily, // Use Roboto dynamically
    },
    palette: {
        info: {
            main: customColors.info,
        },
        text: {
            primary: customColors.primary,
            secondary: customColors.primary,
            disabled: customColors.secondary,
        },
    },
});

export default theme;
