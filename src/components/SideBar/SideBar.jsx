import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sideBarItems } from "../../utils/Constants";

const SideBar = () => {
  const [selected, setSelected] = React.useState("Dashboard");
  return (
    <div>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        className="toolbar"
      >
        <Toolbar>
          <img
            src="https://desk.assiduus.in/content/images/2023/08/Assiduus_TM_Logo--1-.png"
            alt="Logo"
            width="150px"
            height="40px"
          />
        </Toolbar>
        <List sx={{ margin: "8px 0px" }}>
          {sideBarItems?.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => setSelected(item?.title)}
                className={
                  selected === item?.title ? "selected" : "not-selected"
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    color: `${selected === item?.title && "#fff"}`,
                  }}
                >
                  {item?.icon}
                </ListItemIcon>
                <ListItemText primary={item?.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
