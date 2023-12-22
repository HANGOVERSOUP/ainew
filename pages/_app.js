import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import React from 'react';
import "../styles/top_bar.css";
import "../styles/side_bar.css";
import { CustomThemeProvider } from '../styles/ThemeContext';

import "../styles/select_que_upload.css";
import "../styles/select_que_raw_model.css";

function MyApp({ Component, pageProps }) {
  return (
    <CustomThemeProvider> {/* CustomThemeProvider로 감싼다 */}
      <CssBaseline />
      <Component {...pageProps} />
    </CustomThemeProvider>
  );
}

export default MyApp;
