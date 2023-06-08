import React from "react";
// import { MenuBook, Dashboard, People, List } from "@mui/icons-material";
import MenuBook from "@mui/icons-material/MenuBook";
import Dashboard from "@mui/icons-material/Dashboard";
import People from "@mui/icons-material/People";
import List from "@mui/icons-material/List";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import {
  selectDrawerState,
  setDrawerState,
} from "../lib/redux/slices/layoutSlice";
import { useNavigate } from "react-router-dom";
import {
  SwipeableDrawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { selectSessionPermissions } from "../lib/redux/slices/sessionSlice";

const routes = [
  {
    text: "Dashboard",
    route: "/",
    icon: <Dashboard />,
  },
  {
    text: "Portefeuille",
    route: "/portfolio",
    icon: <People />,
    permission: "portfolio-management",
  },
  {
    text: "Offertes",
    route: "/quotes",
    icon: <FileCopyIcon />,
    permission: "quotes-management",
  },
  {
    text: "Marketing Materiaal",
    route: "/marketing",
    icon: <MenuBook />,
    permission: "announcement-management",
  },
];

const MobileNavMenu = () => {
  const permissions = useAppSelector(selectSessionPermissions);

  const menuItems = routes.filter((route) => {
    return !route.permission || permissions.includes(route.permission);
  });

  const open = useAppSelector(selectDrawerState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setDrawerState(false));
  };

  const handleOpen = () => {
    dispatch(setDrawerState(true));
  };

  const path = window.location.pathname;

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      sx={{
        display: { xs: "block", sm: "none" },
      }}
      PaperProps={{
        sx: {
          width: "100%",
        },
      }}
    >
      {menuItems.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            sx={{
              minHeight: 48,
              px: 2.5,
              bgcolor: path === item.route ? "#E4EAF2" : "transparent",
              borderRadius: "8px",
              color: path === item.route ? "#111927" : "#6C737F",
              "&:hover": {
                bgcolor: "#E4EAF2",
              },
            }}
            onClick={() => {
              handleClose();
              navigate(item.route);
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                color: path === item.route ? "#155793" : "#6C737F",
                mr: 3,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </SwipeableDrawer>
  );
};

export default MobileNavMenu;
