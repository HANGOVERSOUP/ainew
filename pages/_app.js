import { CssBaseline, ThemeProvider } from "@mui/material";
import { blue , purple } from '@mui/material/colors';
import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme } from '@mui/material/styles';
import "../styles/top_bar.css";
import "../styles/side_bar.css";

const theme = createTheme({
  palette: {
    mode:"dark",
    primary: {
      light: '#0288d1',
      main: '#0288d1',
      dark: '#0288d1',
      darker: '#0288d1',
      // 파랑
      // light: blue[300],
      // main: blue[500],
      // dark: blue[700],
      // darker: blue[900],
      // 보라
      // main: '#E0C2FF',
      // light: '#F5EBFF',
      // contrastText: '#47008F',
    },
  },
  components: {
    // MuiDrawer: {
    //   styleOverrides: {
    //     paper: {
    //       backgroundColor: '#6794DC',
    //     },
    //   },
    // },
  },


});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
