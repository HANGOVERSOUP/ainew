import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import AuthCheck from "/newcomp/login_auth-check";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box} from '@mui/system';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans Korean',
      'Spoqa Han Sans',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#2196F3',
      dark: '#1976D2', // 어두운 파란색
    },
    background: {
      default: '#F5F5F5',
      paper: '#424242', // 어두운 배경색
    },
    text: {
      primary: '#fff',
      secondary: '#bdbdbd',
    },
    action: {
      active: '#fff',
    },
  },
});

export default function root() {
  const router = useRouter();

//   const pageurl = ["data-upload", "data-check-raw", "data-check-model", "data-net", "data-dashboard"];
  const pageurl = ["data-upload"];
  const enter = (page) => {
    const url = `./${pageurl[page]}`;
    router.push(url);
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthCheck>
        <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        {/* <Grid container spacing={4} justifyContent="center"> */}
          {pageurl.map((page, index) => (
            // <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Grid item xs={3} key={index}>  
              <Paper elevation={3} sx={{ padding: 2, backgroundColor: theme.palette.background.paper }}>
                <Box p={2}>
                  <Typography variant="h5" component="div" gutterBottom style={{ color: theme.palette.text.primary }}>
                    {page.replace('-', ' ')}
                  </Typography>
                  <Typography sx={{ mb: 2 }} color="text.secondary">
                    {/* 홈페이지 바로가기 */}
                  </Typography>
                  <Button 
                    variant="contained" 
                    style={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.action.active }}
                    onClick={() => enter(index)} 
                    size="medium" 
                    fullWidth
                  >
                    들어가기
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AuthCheck>
    </ThemeProvider>
  );
}
