import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { CustomThemeProvider } from '../../styles/ThemeContext';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        LHB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.aaaa

const defaultTheme = createTheme();

export default function Home() {

    const router = useRouter()
   
    const handleLogin = async (userid, userpwd) => {
      // console.log("id : ",userid);
      // console.log("pwd : ",userpwd);
      // ... Fetch request and response handling ...
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', userid);
      formData.append('password', userpwd);
  
      try {
        const response = await fetch('http://115.68.193.117:9999/users/token', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });
  
        if (response.status === 200) {
          const data = await response.json();
          sessionStorage.setItem('token', data.access_token);
  
          // Retrieve the intended route from sessionStorage
          const intendedRoute = sessionStorage.getItem('intendedRoute');
  
          if (intendedRoute) {
            // Clear the intended route from sessionStorage
            sessionStorage.removeItem('intendedRoute');
  
            // Navigate to the intended route
            router.replace(intendedRoute);
          } else {
            if(intendedRoute === null){
              router.replace('./new/root');
            }
            router.replace('/'); 
          }
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
// ㅁ
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userid = data.get('email');
    const userpwd = data.get('password');

    // console.log({ 
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    handleLogin(userid,userpwd);
  };

  return (
    <CustomThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" padding='0'>
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate   
            sx={{
              mt: 0, // 상단 여백을 theme 공간 단위로 조정
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <img
              src="/kring.png" 
              alt="Description" 
              style={{ maxWidth: '100%', height: 'auto' , marginBottom:0}}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="아이디 입력"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ mt: 0 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호 입력"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            //   onChange={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </CustomThemeProvider>
  );
}