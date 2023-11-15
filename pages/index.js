
import { Inter } from 'next/font/google'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  function enter() {
    router.push(`http://115.68.193.117:4000/new/data-dashboard`);

  };

  return (
    <>
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            홈페이지바로가기
            </Typography>
            <Typography variant="h5" component="div">
              홈페이지바로가기
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            홈페이지바로가기
            </Typography>
            <Typography variant="body2">
              홈페이지바로가기
              <br />
              {'"홈페이지바로가기"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={enter} size="small">들어가기</Button>
          </CardActions>
        </Card>
      </div>
    </>
  )
}
