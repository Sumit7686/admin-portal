import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import headerlogo from '../Assets/Images/headerlogo.svg';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <img src={headerlogo} style={{ width: '5%' }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
