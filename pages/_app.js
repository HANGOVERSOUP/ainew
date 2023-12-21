import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import React from 'react';
import "../styles/top_bar.css";
import "../styles/side_bar.css";
import { CustomThemeProvider } from '../styles/ThemeContext';



function MyApp({ Component, pageProps }) {
  return (
    <CustomThemeProvider> {/* CustomThemeProvider로 감싼다 */}
      <CssBaseline />
      <Component {...pageProps} />
    </CustomThemeProvider>
  );
}

export default MyApp;
