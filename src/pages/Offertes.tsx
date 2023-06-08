import { Typography } from "@mui/material";
import React from "react";
import DefaultPageLayout from "../components/DefaultPageLayout";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { selectSessionPermissions } from "../lib/redux/slices/sessionSlice";
import Unauthorized from "./Unauthorized";

const Offertes = () => {
  const permission = useAppSelector(selectSessionPermissions)

  if(!permission.includes("quotes-management")) {
    return (
      <Unauthorized />
    )
  }

  return (
    <>
      <Typography variant="h1">Offertes</Typography>
    </>
  );
};

export default Offertes;
