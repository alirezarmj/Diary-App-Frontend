import { IconButton } from "@mui/material";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";

const Logo = () => {
  return (
    <IconButton>
      <ModeOfTravelIcon
        sx={{
          color: "darkslategrey",
          fontSize: "40px",
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))",
          animation: "pulse 1.5s infinite", // Apply the animation
          "@keyframes pulse": {
            "0%": {
              transform: "scale(1)",
              color: "darkslategrey", // Original color
            },
            "50%": {
              transform: "scale(1.1)",
              color: "orange", // Change to orange when scaling up
            },
            "100%": {
              transform: "scale(1)",
              color: "darkslategrey", // Return to original color
            },
          },
          "&:hover": {
            animation: "none", // Stop the animation on hover
            transform: "scale(1.1)",
            color: "darkcyan", // Hover color
          },
        }}
      />
    </IconButton>
  );
};

export default Logo;
