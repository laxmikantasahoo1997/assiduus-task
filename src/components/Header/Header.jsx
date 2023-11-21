import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import "./header.css";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "5px",
  backgroundColor: "#eaeaea",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ handleClick }) {
  return (
    <AppBar
      className="header"
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        background: "#fff",
        color: "black",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex", gap: "20px" } }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ margin: "22px 0px", textTransform: "none" }}
            onClick={handleClick}
          >
            Click to change the value
          </Button>
          <Box sx={{ margin: "1.2rem 0rem" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <IconButton size="large" color="inherit">
            <Badge badgeContent=" " variant="dot" color="primary">
              <NotificationsIcon sx={{ fontSize: "1.7rem" }} />
            </Badge>
          </IconButton>
          <IconButton>
            <Avatar
              alt="Remy Sharp"
              src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            />
          </IconButton>
          <IconButton size="large" color="inherit">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              style={{ border: "none" }}
              className="menu__container"
            >
              <MenuItem value={10}>Help</MenuItem>
              <MenuItem value={20}>Logout</MenuItem>
            </Select>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
