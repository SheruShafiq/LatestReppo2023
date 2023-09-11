import React, { useEffect, useMemo, useState } from "react";
import {
  logout,
  selectSessionCsrf,
  selectSessionExpiresAt,
} from "../lib/redux/slices/sessionSlice";

import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Box } from "@mui/material";
import ContentBox from "./ContentBox";
import Dashboard from "@mui/icons-material/Dashboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Header from "./Header";
import IconDropDownMenu from "./IconDropDownMenu";
import ListIcon from "@mui/icons-material/List";
import Logout from "@mui/icons-material/Logout";
import LogoutTimer from "./LogoutTimer3";
import { LogoutTimerModal } from "./LogoutTimerModal";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MobileNavMenu from "./MobileNavMenu";
import NavigationMenu from "./NavigationMenu";
import People from "@mui/icons-material/People";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { RoutePaths } from "../lib/types/RoutesPaths";
import Settings from "@mui/icons-material/Settings";
import { SpeakerNotes } from "@mui/icons-material";
import { setAccountMenuState } from "../lib/redux/slices/layoutSlice";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import useResizeHandler from "../lib/hooks/useResizeHandler";

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
const drawerWidth = 280;

export type route = {
  text: string;
  route: string;
  icon: React.ReactNode;
  testId: string;
  accordian?: boolean;
  permission?: string;
};
const routes: route[] = [
  { text: "Dashboard", route: "/", icon: <Dashboard />, testId: "dashboard" },

  {
    text: "Portefeuille",
    route: "/portfolio",
    icon: <People />,
    testId: "portfolio",
    permission: "portfolio",
  },
  {
    text: "Gebruikersbeheer",
    route: "/userManagement",
    icon: <People />,
    testId: "userManagement",
    accordian: true,
    permission: "users-management",
  },
  {
    text: "Offertes",
    route: "/quotes",
    icon: <FileCopyIcon />,
    testId: "quotes",
    permission: "quotes",
  },
  {
    text: "Meldingen beheer",
    route: "/notificationsAdmin",
    icon: <AnnouncementIcon />,
    testId: "notificationsAdmin",
    permission: "announcements-management",
  },
  {
    text: "Documenten",
    route: "/documents",
    icon: <MenuBookIcon />,
    testId: "documents",
    permission: "documents",
  },
  {
    text: "Documentenbeheer",
    route: "/documentsAdmin",
    icon: <FileCopyIcon />,
    testId: "documentsAdmin",
    permission: "documents-management",
  },
  {
    text: "Foutenlog",
    route: "/errorLogging",
    icon: <ListIcon />,
    testId: "errorLog",
    permission: "logging",
  },
  {
    text: "Kennisbeheer",
    route: "/FaqAdmin",
    icon: <MenuBookIcon />,
    testId: "faqAdmin",
    permission: "faqs-management",
  },
  {
    text: "Nieuwsbeheer",
    route: "/newsAdmin",
    icon: <SpeakerNotes />,
    testId: "faqAdmin",
    permission: "news-management",
  },
  {
    text: "Instellingen",
    route: "/settings",
    icon: <Settings />,
    testId: "settings",
    accordian: true,
  },
];
const DefaultPageLayout = ({ children }: DefaultPageLayoutProps) => {
  const dispatch = useAppDispatch();
  const size = useResizeHandler();
  const handleMenu = () => {
    if (size.width <= 600) {
      return <MobileNavMenu />;
    } else {
      return <NavigationMenu routes={routes} drawerWidth={280} />;
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
      <LogoutTimer />
    </Box>
  );
};

export default DefaultPageLayout;
