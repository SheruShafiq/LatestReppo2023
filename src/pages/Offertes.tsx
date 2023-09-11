import DefaultPageLayout from "../components/DefaultPageLayout";
import React from "react";
import { Typography } from "@mui/material";
import Unauthorized from "./Unauthorized";
import { selectSessionPermissions } from "../lib/redux/slices/sessionSlice";
import { useAppSelector } from "../lib/hooks/useAppSelector";

const Offertes = () => {
  const permission = useAppSelector(selectSessionPermissions);

  if (!permission.includes("quotes")) {
    return <Unauthorized />;
  }

  return (
    <>
      <Typography variant="h1">Offertes</Typography>
    </>
  );
};

export default Offertes;
