import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#123b7a',
    },
    secondary: {
      main: '#2f6fd6',
    },
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
    error: {
      main: '#b9382f',
    },
    text: {
      primary: '#1a2a3a',
      secondary: '#5a6b7f',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.55,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
});

export default theme;
