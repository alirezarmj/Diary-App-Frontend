import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Logo from "./Logo";
import NavigationDrawer from "./NavigationDrawer";
import NavigationTabs from "./NavigationTabs";

const linksDiaries = ["home", "diaries", "auth"];
const loggedInLinks = ["home", "diaries", "profile", "add-post"];

const Header = () => {
  const [value, setValue] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLogin = useSelector((state) => state.isLogin);

  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1] || "home";
    const links = isLogin ? loggedInLinks : linksDiaries;
    const index = links.indexOf(currentPath);
    setValue(index === -1 ? false : index);
  }, [location.pathname, isLogin]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "sticky" }}>
      <Toolbar>
        <Logo />
        {isMobile ? (
          <NavigationDrawer isLogin={isLogin} linksDiaries={linksDiaries} loggedInLinks={loggedInLinks} drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
        ) : (
          <NavigationTabs isLogin={isLogin} linksDiaries={linksDiaries} loggedInLinks={loggedInLinks} value={value} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
