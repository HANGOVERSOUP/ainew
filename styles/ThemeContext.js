// ThemeContext.js
import React, { createContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

export const ThemeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: mode === 'light'
        ? {
            // 라이트 모드일 때의 primary 색상 설정
            // 추천받은 연한파랑
            light: '#BBDEFB',

            // 추천받은 파랑색
            main: '#2196F3',  

            dark: '#1565C0',
            darker: '#BBDEFB',
          }
        : {
            // 다크 모드일 때의 primary 색상 설정
            // 추천받은 연한파랑
            light: '#BBDEFB',

            // 추천받은 파랑색
            main: '#2196F3',  

            dark: '#BBDEFB',
            darker: '#BBDEFB',
          },
      // 추가적인 팔레트 설정
    },
    // 기타 테마 설정...
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, theme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
