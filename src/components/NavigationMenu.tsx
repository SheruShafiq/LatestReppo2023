import * as React from "react";

import { CSSObject, Theme, styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import { route } from "./DefaultPageLayout";
import { selectDrawerState } from "../lib/redux/slices/layoutSlice";
import { selectSessionPermissions } from "../lib/redux/slices/sessionSlice";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import useResizeHandler from "../lib/hooks/useResizeHandler";

export type MiniDrawerProps = {
  routes: route[];
  drawerWidth: number;
};

export default function MiniDrawer({ routes, drawerWidth }: MiniDrawerProps) {
  const transitionMixin = (
    theme: Theme,
    open: boolean | undefined
  ): CSSObject => ({
    width: open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration:
        theme.transitions.duration[open ? "enteringScreen" : "leavingScreen"],
    }),
    overflowX: "hidden",
    zIndex: 0,
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "3.75rem",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => {
    const mixin = transitionMixin(theme, open);
    return {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      zIndex: 0,
      ...mixin,
      "& .MuiDrawer-paper": mixin,
    };
  });
  const { width } = useResizeHandler();
  const open = useAppSelector(selectDrawerState);
  const [actualState, setActualState] = React.useState(open);
  const location = useLocation();
  const navigate = useNavigate();
  const permissions = useAppSelector(selectSessionPermissions);
  const menuItems: route[] = routes.filter(
    (route: route) =>
      !route.permission || permissions.includes(route.permission)
  );

  React.useEffect(() => {
    setActualState(width > 900 ? true : open);
  }, [width, open]);

  const isCurrentRoute = (itemRoute: string) =>
    location.pathname.startsWith(itemRoute) &&
    (itemRoute !== "/" || location.pathname === "/");
  return (
    <Drawer
      variant="permanent"
      open={actualState}
      PaperProps={{
        sx: { display: { xs: "block", sm: "block" }, width: { xs: "100vw" } },
      }}
      data-testid="NavMenuDrawer"
    >
      <DrawerHeader />
      <List id="NavMenuDrawerList">
        {menuItems.map(({ route, icon, text, testId, accordian }, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block", px: 1 }}>
            <ListItemButton
              data-testid={testId}
              sx={{
                mt: index == 0 ? 0 : 0.5,
                minHeight: 48,
                justifyContent: actualState ? "initial" : "center",
                px: 2.5,
                bgcolor: isCurrentRoute(route) ? "#E4EAF2" : "transparent",
                borderRadius: "8px",
                color: isCurrentRoute(route) ? "#111927" : "#6C737F",
                "&:hover": { bgcolor: "#E4EAF2" },
              }}
              onClick={() => navigate(route)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: actualState ? 3 : "auto",
                  justifyContent: "center",
                  color: isCurrentRoute(route) ? "#155793" : "#6C737F",
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: actualState ? 1 : 0 }}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              {accordian ? (
                <ListItemIcon
                  sx={{
                    alignSelf: "center",
                    minWidth: 0,
                    mr: "-1rem",
                    justifyContent: "center",
                    color: isCurrentRoute(route) ? "#155793" : "#6C737F",
                  }}
                >
                  <KeyboardArrowRightIcon />
                </ListItemIcon>
              ) : null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
