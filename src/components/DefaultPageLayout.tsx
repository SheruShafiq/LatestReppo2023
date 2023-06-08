import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ContentBox from "./ContentBox";
import Header from "./Header";
import IconDropDownMenu from "./IconDropDownMenu";
import NavigationMenu from "./NavigationMenu";
import MobileNavMenu from "./MobileNavMenu";
import useResizeHandler from "../lib/hooks/useResizeHandler";
import LogoutTimer from "./LogoutTimer3";
import {
  logout,
  selectSessionCsrf,
  selectSessionExpiresAt,
  setSessionExpiresAt,
} from "../lib/redux/slices/sessionSlice";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { setAccountMenuState } from "../lib/redux/slices/layoutSlice";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { RoutePaths } from "../lib/types/RoutesPaths";
import { LogoutTimerModal } from "./LogoutTimerModal";

export type DefaultPageLayoutProps = {
  children: React.ReactNode;
};
export type MenuItem = {
  id: number;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
};
export type IconDropDownMenuProps = {
  menuItemProps: MenuItem[];
  elementId: HTMLElement | null;
};

const SESSION_WARNING_SECONDS = 300; // 5 minutes in seconds

const DefaultPageLayout = ({ children }: DefaultPageLayoutProps) => {
  const dispatch = useAppDispatch();
  const size = useResizeHandler();
  const handleMenu = () => {
    if (size.width <= 600) {
      return <MobileNavMenu />;
    } else {
      return <NavigationMenu />;
    }
  };
  const csrfToken = useAppSelector(selectSessionCsrf);
  const handleClose = () => {
    dispatch(setAccountMenuState(false));
  };
  const handleLogout = async () => {
    const response = await fetch("/api/sessions/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({}),
    });
    if (response.ok) {
      dispatch(logout());
      window.location.href = RoutePaths.Login;
    }
  };
  const menuItems = [
    {
      id: 1,
      onClick: handleClose,
      label: "Add another account",
      icon: <PersonAdd fontSize="small" />,
    },
    {
      id: 2,
      onClick: handleClose,
      label: "Settings",
      icon: <Settings fontSize="small" />,
    },
    {
      id: 3,
      onClick: handleLogout,
      label: "Logout",
      icon: <Logout fontSize="small" />,
    },
  ];

  const [state, setState] = useState(false);
  const [seconds, setSeconds] = useState(SESSION_WARNING_SECONDS);
  const expiryStore = useAppSelector(selectSessionExpiresAt);

  useEffect(() => {
    if (expiryStore) {
      const checkExpiry = () => {
        const expiryTime = parseInt(expiryStore) * 1000;
        const currentTime = new Date().getTime();

        if (expiryTime - currentTime < SESSION_WARNING_SECONDS * 1000) {
          setState(true);
        }
      };

      const intervalId = setInterval(checkExpiry, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const minutes = useMemo(() => Math.floor(seconds / 60), [seconds]);
  const progress = useMemo(
    () => (seconds / SESSION_WARNING_SECONDS) * 100,
    [seconds]
  );

  function formatTime(time: number) {
    return time < 10 ? `0${time}` : time;
  }

  async function fetchSessionInit() {
    const res = await fetch("/api/sessions/init");
    const newExpiry = await res.json();
    dispatch(setSessionExpiresAt(newExpiry.expires_at));
  }

  const extendSession = async () => {
    setState(false);
    const newExpiry = await fetchSessionInit();
    dispatch(setSessionExpiresAt(newExpiry.expires_at));
  };

  return (
    <Box>
      <IconDropDownMenu
        menuItemProps={menuItems}
        elementId={document.getElementById("account-menu")}
      />
      <Header />
      <Box display={"flex"}>
        <Box>{handleMenu()}</Box>
        <ContentBox>{children}</ContentBox>
      </Box>
      <LogoutTimerModal
        isOpen={state}
        onExtendSession={extendSession}
        onLogout={handleLogout}
        seconds={seconds}
        minutes={minutes}
        progress={progress}
        formatTime={formatTime}
      />
    </Box>
  );
};

export default DefaultPageLayout;
