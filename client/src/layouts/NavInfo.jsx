import './Layouts.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, ListItemButton } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NavInfo(props) {

  // const [ham, setHam] = useState(false)

  // const toggleHamburger = () => {
  //   setHam(prevState => !prevState)
  // }
  const { children, currentUser, handleLogout } = props;
  // return (
  //   <div >
  //     <header className={ham ? 'sidebar no-show' : 'sidebar show'}>
  //       <Link to='/' id='nodec'><h1 className='header-title' >SalesVerse</h1></Link>
  //       {currentUser ? (
  //         <div className='navinfo-text'>
  //           <div className='navinfo-subtext'>
  //             <p>Welcome back, {currentUser.username}</p>
  //             <Link to='/products' id='nodec'>Products</Link>
  //             <Link to='/sales' id='nodec'>Sales</Link>
  //           </div>
  //           <button onClick={handleLogout} id='logout-button'>Log Out</button>
  //         </div>
  //       ) :
  //         (<div className='navinfo-text-signedout'>
  //           <Link to='/login' id='nodec'>Log In</Link>
  //           <Link to='/signup' id='nodec'>Sign Up</Link>
  //         </div>)
  //       }

  //     </header>
  //     <button className="ham" onClick={toggleHamburger}>
  //       <i className={ham ? 'X' : '='}></i>
  //     </button>
  //     {children}
  //   </div >
  //)
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Link to='/' id='nodec'><h3 className='header-title' >SalesVerse</h3></Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Typography>Welcome, {currentUser?.username}</Typography>
          <Button onClick={handleDrawerClose}><Link to='/products' id='nodec1'>Products</Link></Button>
          <Button onClick={handleDrawerClose}><Link to='/sales' id='nodec1'>Sales</Link></Button>
          <Divider />
          <Button onClick={handleLogout}>Log Out</Button>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
      {children}
    </>
  )
}
