import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D9B8B2',
        },
        secondary: {
            main: '#6C403E',
            contrastText: '#60B5FF',
            light: '#F7374F',
        },
        background: {
            default: '#f6efef',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

export default theme;
