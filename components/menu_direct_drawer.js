import React from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const DrawerContainer = styled('div')({
  width: 250,
});

const listStyles = {
  width: 250,
};

export default function TemporaryDrawer() {
  //  표출 버튼종류임
  const [state, setState] = React.useState({
    left: false, 
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <DrawerContainer style={listStyles}>
      <List>
        {['으아앙', '으아앙', '으아앙', '으아앙'].map((text, index) => (
          <ListItem button key={text}>
            {/* 아이콘임 */}
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {/* 구분선임 */}
      <Divider />
      <List>
        {['으아앙', '으아앙', '으아앙'].map((text, index) => (
          <ListItem button key={text}>
            {/* 아이콘임 */}
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );

  return (
    <div>
      <React.Fragment>
        {/* 버튼 */}
        <Button id='menu_dir' variant="contained" color="primary" onClick={toggleDrawer('left', true)}>메뉴 바로가기</Button>
        <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
