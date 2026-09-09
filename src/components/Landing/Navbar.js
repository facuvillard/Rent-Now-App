import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import * as Routes from 'constants/routes';
import rentnowLogo from 'assets/Landing/rentnow-logo-landing.png';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#1E293B',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        <Box
          component={RouterLink}
          to={Routes.LANDING}
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <Box
            component="img"
            src={rentnowLogo}
            alt="Rent Now Logo"
            sx={{ height: 38, width: 'auto', objectFit: 'contain' }}
          />
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button
            component="a"
            href="#HowItWorks"
            variant="text"
            sx={{ color: '#FAFAFA', fontWeight: 500 }}
          >
            ¿Cómo funciona?
          </Button>
          <Button
            component="a"
            href="#AboutUs"
            variant="text"
            sx={{ color: '#FAFAFA', fontWeight: 500 }}
          >
            Sobre nosotros
          </Button>
          <Button
            component={RouterLink}
            to={Routes.LOGIN}
            variant="text"
            sx={{ color: '#FCC931', fontWeight: 600 }}
          >
            Iniciar Sesión
          </Button>
          <Button
            component={RouterLink}
            to={Routes.REGISTER_USER}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            Registrate
          </Button>
        </Box>

        {/* Mobile menu trigger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color="primary"
            aria-label="Abrir menú"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 280, backgroundColor: '#1E293B', color: '#FAFAFA', p: 2 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: '#FAFAFA' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItemButton
            component="a"
            href="#HowItWorks"
            onClick={toggleDrawer(false)}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemText primary="¿Cómo funciona?" />
          </ListItemButton>
          <ListItemButton
            component="a"
            href="#AboutUs"
            onClick={toggleDrawer(false)}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemText primary="Sobre nosotros" />
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to={Routes.LOGIN}
            onClick={toggleDrawer(false)}
            sx={{ borderRadius: 2, mb: 1, color: '#FCC931' }}
          >
            <ListItemText primary="Iniciar Sesión" />
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to={Routes.REGISTER_USER}
            onClick={toggleDrawer(false)}
            sx={{
              borderRadius: 2,
              backgroundColor: '#FCC931',
              color: '#1E293B',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#FDE06D' },
            }}
          >
            <ListItemText primary="Registrate" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
