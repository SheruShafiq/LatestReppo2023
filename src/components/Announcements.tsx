import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export type AnnouncementProps = {
  title?: string;
  content: string;
  level: "info" | "warning" | "error";
};

const Announcements = ({ content, level, title }: AnnouncementProps) => {
  const getBorderStyling = () => {
    switch (level) {
      case "info":
        return "4px solid #0288D1";
      case "warning":
        return "4px solid #FFA000";
      case "error":
        return "4px solid #D32F2F";
    }
  };

  return (
    <Alert
      severity={level}
      sx={{
        borderLeft: getBorderStyling(),
        marginBottom: "2rem",
      }}
    >
      <AlertTitle>
        <b>{title}</b>
      </AlertTitle>
      {content}
    </Alert>
  );
};

export default Announcements;
