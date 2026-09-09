import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Feriados"];

const Horarios = ({ horarios }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        border: "1px solid rgba(226,232,240,0.8)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {days.map((day, idx) => {
            const dayInfo = horarios?.[day];
            const isOpen = Boolean(dayInfo?.abre);

            return (
              <React.Fragment key={day}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#1E293B" }}>
                    {day}
                  </Typography>

                  {isOpen ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
                        {dayInfo.desde} - {dayInfo.hasta}
                      </Typography>
                      <Chip
                        label="Abierto"
                        size="small"
                        sx={{
                          bgcolor: "rgba(16,185,129,0.12)",
                          color: "#059669",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          height: 22,
                        }}
                      />
                    </Box>
                  ) : (
                    <Chip
                      label="Cerrado"
                      size="small"
                      sx={{
                        bgcolor: "rgba(239,68,68,0.12)",
                        color: "#DC2626",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        height: 22,
                      }}
                    />
                  )}
                </Box>
                {idx < days.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Horarios;
