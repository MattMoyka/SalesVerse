import './Layouts.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


export default function NavHome(props) {
  const { children, currentUser, handleLogout } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
      {/* <header className='header'>
        <Link to='/' id='nodec'><h1 className='header-title' >SalesVerse</h1></Link>
        {currentUser ? (
          <div className='header-text'>
            <p>Welcome back, {currentUser.username}</p>
            <Link to='/products' id='nodec'>Products</Link>
            <Link to='/sales' id='nodec'>Sales</Link>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) :
          (<div className='header-text'>
            <Link to='/login' id='nodec'>Log In</Link>
            <Link to='/signup' id='nodec'>Sign Up</Link>
          </div>)
        }
      </header>  */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
              <Link to='/' id='nodec'>SalesVerse</Link>
            </Typography>

            <div>
              <Box sx={{ display: { sm: 'none' } }} >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {currentUser ? <h4>hello</h4> :
                    <>
                      <MenuItem onClick={handleClose}><Link to='/login' id='nodec' >Log In</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link to='/signup' id='nodec'>Sign Up</Link></MenuItem></>}
                </Menu>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Typography sx={{ pr: '30px' }}> <Link to='/login' id='nodec'>Log In</Link></Typography>
                <Typography><Link to='/signup' id='nodec'>Sign Up</Link></Typography>
              </Box>
            </div>

          </Toolbar>
        </AppBar>
      </Box>

      {children}
    </div >
  )
}
