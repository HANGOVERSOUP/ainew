import { Inter } from 'next/font/google'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

//aaa 

export default function Home() {
  const router = useRouter();

  const pageurl = ["data-upload","data-check-raw","data-check-model","data-net","data-dashboard",];
  const enter =  (page) => {
    // const url = `http://115.68.193.117:4000/new/${pageurl[page]}`;
    const url = `./${pageurl[page]}`;
    router.push(url);
  }

  return (
    <>
      <div>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          {/* data-upload */}
          <CardContent>

            <Typography variant="h5" component="div">
              data_upload
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              홈페이지바로가기
            </Typography>

            <CardActions>
              <Button onClick={() => enter(0)} size="small">들어가기</Button>
            </CardActions>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ minWidth: 275 }}>
          {/* data-check-raw */}
          <CardContent>

            <Typography variant="h5" component="div">
              data_check_raw
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              홈페이지바로가기
            </Typography>


            <CardActions>
              <Button onClick={() => enter(1)} size="small">들어가기</Button>
            </CardActions>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ minWidth: 275 }}>
          {/* data-check-model */}
          <CardContent>

            <Typography variant="h5" component="div">
              data_check_model
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              홈페이지바로가기
            </Typography>


            <CardActions>
              <Button onClick={() => enter(2)} size="small">들어가기</Button>
            </CardActions>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ minWidth: 275 }}>
          {/* data-net */}
          <CardContent>

            <Typography variant="h5" component="div">
              data_net
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              홈페이지바로가기
            </Typography>

            <CardActions>
              <Button onClick={() => enter(3)} size="small">들어가기</Button>
            </CardActions>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ minWidth: 275 }}>
          {/* data-dashboard */}
          <CardContent>

            <Typography variant="h5" component="div">
              data_dashboard
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              홈페이지바로가기
            </Typography>


            <CardActions>
              <Button onClick={() => enter(4)} size="small">들어가기</Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
