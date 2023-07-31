// src/components/RightSide.tsx
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Announcements, { AnnouncementProps } from "@/components/Announcements";
import CopyrightText from "@/components/CopyrightText";
import {
  CollapsibleListItem as CollapsibleListItem,
  CollapsibleListItemProps,
} from "@/components/CollapsibleListItem";
import LoginButton from "@/components/LoginButton";
import News from "@/components/News";
import { NewsType } from "@/lib/types/NewsType";

interface RightSideProps {
  logo: string;
  announcements: AnnouncementProps[] | undefined;
  faqs: CollapsibleListItemProps[] | undefined;
  news: NewsType[] | undefined;
  size: { width: number; height: number };
}

const RightSide: React.FC<RightSideProps> = ({
  logo,
  announcements,
  faqs,
  news,
  size,
}) => (
  <Box
    sx={{
      width: {
        xs: "auto",
        sm: "auto",
        md: "31rem",
        lg: "31rem",
        xl: "31rem",
      },
      height: {
        xs: "auto",
        sm: "auto",
        md: "100vh",
        lg: "100vh",
        xl: "100vh",
      },
      paddingLeft: "2rem",
      paddingRight: "2rem",
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      marginTop: "auto",
    }}
  >
    <Box
      sx={{
        flexGrow: 1,
      }}
    />
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
      }}
    >
      <img src={logo} alt="Logo" />
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "black",
          marginBottom: "1rem",
          position: "relative",
          bottom: "3px",
          paddingLeft: "1rem",
          paddingTop: "2rem",
        }}
      >
        Funeral Insurance Portal
      </Typography>
    </Box>

    <Typography
      variant="body1"
      sx={{
        fontSize: "1rem",
        color: "black",
        marginBottom: "2rem",
      }}
    >
      Welkom bij het intermediair portaal van Verzekeraar. Dit portaal is
      bedoeld om u als intermediair zo goed mogelijk te ondersteunen in de
      administratieve handelingen namens uw klanten.
    </Typography>
    {announcements &&
      announcements.map((announcement, index) => (
        <Announcements
          title={announcement.title}
          content={announcement.content}
          level={announcement.level}
          key={index}
        />
      ))}
    {announcements &&
    announcements.length > 0 &&
    announcements[0].level === "error" ? null : (
      <LoginButton />
    )}
    {faqs ? (
      <Box
        sx={{
          marginTop: "2rem",
        }}
      >
        <Typography
          variant="h6"
          paddingBottom={"0.5rem"}
          fontSize={14}
          fontWeight={"bold"}
        >
          Veelgestelde Vragen
        </Typography>
        <Divider />

        {faqs &&
          faqs.map((item) => (
            <CollapsibleListItem
              title={item.question}
              content={item.answer}
              key={item.question}
            />
          ))}
      </Box>
    ) : null}
    {size.width <= 600 && news ? <News articles={news} onMobile /> : null}
    <Box
      sx={{
        flexGrow: 1,
      }}
    />
    <CopyrightText />
  </Box>
);

export default RightSide;
