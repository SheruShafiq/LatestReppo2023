import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/AerLogo.svg";
import HelpOutline from "@mui/icons-material/HelpOutline";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import {
  selectAccountMenuState,
  selectDrawerState,
  setAccountMenuState,
  setDrawerState,
} from "../lib/redux/slices/layoutSlice";

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const drawerState = useAppSelector(selectDrawerState);
  const menuState = useAppSelector(selectAccountMenuState);
  const handleToggleDrawer = () => {
    dispatch(setDrawerState(!drawerState));
  };

  const handleToggleMenu = () => {
    dispatch(setAccountMenuState(!menuState));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        zIndex: 1200,
        width: "100%",
      }}
      position={"fixed"}
      id="headerBox"
    >
      <AppBar
        position="relative"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          bgcolor: "white",
          alignItems: "center",
          borderBottom: "1px solid #D1D5DC",
          height: "3.75rem",
        }}
        elevation={0}
        id="headerAppBar"
      >
        <Box>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={() => handleToggleDrawer()}
              sx={{
                mr: 2,
                color: "#1E293B",
                display: { md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <img src={Logo} alt="Logo" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              paddingLeft={"1rem"}
              color="#1E293B"
              display={{ xs: "none", md: "block" }}
            >
              Funeral Insurance Portal
            </Typography>
          </Toolbar>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingRight: "1rem",
          }}
        >
          <HelpOutline
            sx={{
              color: "#1E293B",
              mx: "1rem",
            }}
          />
          <IconButton
            onClick={() => handleToggleMenu()}
            aria-label="account"
            id="account-menu"
          >
            <AccountCircleOutlined
              sx={{
                color: "#1E293B",
              }}
            />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
}
