import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EventIcon from "@mui/icons-material/Event";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { AuthContext } from "Auth/Auth";
import { signOut } from "api/auth";
import Notifications from "components/Layout/Notifications";
import * as Routes from "constants/routes";
import rentnowLogo from "assets/Landing/rentnow-logo-landing.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const { currentUser, currentUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRouteMisReservas = () => {
    handleMenuClose();
    navigate(Routes.CONSULTAR_RESERVAS);
  };

  const handleRouteComplejos = () => {
    handleMenuClose();
    navigate(Routes.COMPLEJOS);
  };

  const handleLogOut = async () => {
    handleMenuClose();
    try {
      const resp = await signOut();
      if (resp.status === "OK") {
        navigate(Routes.LOGIN);
      }
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1E293B",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        {/* Brand / Logo */}
        <Box
          component={RouterLink}
          to={currentUser ? Routes.COMPLEJOS : Routes.LANDING}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src={rentnowLogo}
            alt="Rent Now Logo"
            sx={{
              height: 38,
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </Box>

        {/* Right side actions */}
        {currentUser === null ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              component={RouterLink}
              to={Routes.LOGIN}
              variant="text"
              sx={{ color: "#FAFAFA", fontWeight: 600 }}
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
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={handleRouteComplejos}
              variant="text"
              startIcon={<SportsSoccerIcon />}
              sx={{
                color: "#FAFAFA",
                display: { xs: "none", sm: "inline-flex" },
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              Complejos
            </Button>

            <Button
              onClick={handleRouteMisReservas}
              variant="text"
              startIcon={<EventIcon />}
              sx={{
                color: "#FAFAFA",
                display: { xs: "none", sm: "inline-flex" },
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              Mis Reservas
            </Button>

            <Notifications />

            <IconButton
              onClick={handleMenuOpen}
              sx={{
                p: 0.5,
                color: "#FAFAFA",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#FCC931",
                  color: "#1E293B",
                  width: 36,
                  height: 36,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                {currentUserData?.nombre
                  ? currentUserData.nombre.charAt(0).toUpperCase()
                  : currentUser.email?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                sx: {
                  width: 240,
                  borderRadius: 3,
                  mt: 1,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {currentUserData?.nombre
                    ? `${currentUserData.nombre} ${currentUserData.apellido || ""}`
                    : currentUser.displayName || "Usuario"}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap display="block">
                  {currentUser.email}
                </Typography>
              </Box>
              <Divider />

              <MenuItem onClick={handleRouteComplejos} sx={{ py: 1.2 }}>
                <SportsSoccerIcon sx={{ mr: 1.5, fontSize: 20, color: "text.secondary" }} />
                Explorar Complejos
              </MenuItem>

              <MenuItem onClick={handleRouteMisReservas} sx={{ py: 1.2 }}>
                <EventIcon sx={{ mr: 1.5, fontSize: 20, color: "text.secondary" }} />
                Mis Reservas
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogOut} sx={{ py: 1.2, color: "error.main" }}>
                <ExitToAppIcon sx={{ mr: 1.5, fontSize: 20 }} />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
