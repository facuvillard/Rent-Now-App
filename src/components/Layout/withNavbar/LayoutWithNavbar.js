import React from "react";
import Navbar from "components/Layout/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useLocation, useNavigate } from "react-router-dom";
import * as Routes from "constants/routes";

const LayoutWithNavbar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleReturn = () => {
    if (location.state?.fromConfirmar || location.pathname.includes("confirmar")) {
      navigate(Routes.COMPLEJOS);
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(Routes.COMPLEJOS);
    }
  };

  const isHomeRoute =
    location.pathname === Routes.COMPLEJOS ||
    location.pathname === Routes.LANDING ||
    location.pathname === "/";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#F8FAFC" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pb: 6 }}>
        {children}
      </Box>

      {!isHomeRoute && (
        <Fab
          aria-label="Volver"
          size="medium"
          color="secondary"
          onClick={handleReturn}
          sx={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 1000,
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            bgcolor: "#1E293B",
            "&:hover": { bgcolor: "#334155" },
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 30 }} />
        </Fab>
      )}
    </Box>
  );
};

export default LayoutWithNavbar;
