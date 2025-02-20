/* eslint-disable react/prop-types */
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { Link } from "react-router";

const NavigationDrawer = ({ isLogin, linksDiaries, loggedInLinks, drawerOpen, handleDrawerToggle }) => {
  return (
    <>
      <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ ml: "auto" }}>
        <MenuIcon sx={{ color: "black" }} />
      </IconButton>
      <Drawer
        PaperProps={{
          sx: {
            width: { sm: "20%", md: "30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "30px",
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <ModeOfTravelIcon sx={{ color: "darkcyan", fontSize: "30px" }} />
        <List>
          <Divider sx={{ color: "darkcyan", py: 1 }} />
          {(isLogin ? loggedInLinks : linksDiaries).map((link, index) => (
            <ListItem button key={index} component={Link} to={link === "home" ? "/" : `/${link}`} onClick={handleDrawerToggle}>
              <ListItemText
                primary={link === "add-post" ? "Add Diary" : link}
                sx={{
                  color: "darkcyan",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
