import { Typography } from "@mui/material";
import React from "react";
import DefaultPageLayout from "../components/DefaultPageLayout";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { selectSessionPermissions } from "../lib/redux/slices/sessionSlice";
import Unauthorized from "./Unauthorized";

const Marketing = () => {
  const permission = useAppSelector(selectSessionPermissions)

  if(!permission.includes("announcement-management")) {
    return (
      <Unauthorized />
    )
  }
  return (
    <>
      <Typography variant="h1">Marketing</Typography>
    </>
  );
};

export default Marketing;
