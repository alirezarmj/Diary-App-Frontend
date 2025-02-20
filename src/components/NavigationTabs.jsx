/* eslint-disable react/prop-types */
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router";

const NavigationTabs = ({ isLogin, linksDiaries, loggedInLinks, value }) => {
  return (
    <Tabs value={value === false ? false : value} sx={{ ml: "auto" }}>
      {(isLogin ? loggedInLinks : linksDiaries).map((link, index) => (
        <Tab
          key={index}
          component={Link}
          to={link === "home" ? "/" : `/${link}`}
          label={link === "add-post" ? "Add Diary" : link}
          sx={{
            textDecoration: "none",
            ":hover": {
              textDecoration: "underline",
              textUnderlineOffset: "18px",
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default NavigationTabs;
