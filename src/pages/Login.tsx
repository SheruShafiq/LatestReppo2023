// src/pages/Login.tsx
import { Box } from "@mui/material";
import Family from "../assets/family-min.jpg";
import LeftSide from "./Login/LeftSide";
import Logo from "../assets/AerLogo.svg";
import React from "react";
import RightSide from "./Login/RightSide";
import usePublicData from "@/lib/hooks/useAPI";
import useResizeHandler from "../lib/hooks/useResizeHandler";

const Login = () => {
  const size = useResizeHandler();
  const faqs = usePublicData("/api/faqs/public/login");
  const news = usePublicData("/api/news/public");
  const announcements = usePublicData("/api/announcements/public");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: size.width > 600 && size.width < 900 ? "column" : "row",
        flexGrow: 1,
        height: "100vh",
      }}
    >
      <LeftSide backgroundImage={Family} news={news} size={size} />
      <RightSide
        logo={Logo}
        announcements={announcements}
        faqs={faqs}
        news={news}
        size={size}
      />
    </Box>
  );
};

export default Login;
