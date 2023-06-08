import { Typography } from "@mui/material";
import React from "react";
import searchingSVG from "../assets/images/undraw_searching.svg";

const NoSearchResult = () => {
  return (
    <>
      <img
        src={searchingSVG}
        alt=""
        style={{
          width: "268px",
        }}
        data-testid="image"
      />
      <Typography
        variant="h1"
        color={"#1A202C"}
        fontWeight={600}
        fontSize={24}
        lineHeight={"32px"}
        sx={{
          mt: "2rem",
        }}
      >
        Helaas geen resultaat{" "}
      </Typography>
      <Typography
        variant="body2"
        color={"#6C737F"}
        sx={{
          mt: "1rem",
          mb: "2rem",
        }}
      >
        We konden geen klanten vinden op basis van de opgegeven zoekwoorden.{" "}
      </Typography>
    </>
  );
};

export default NoSearchResult;
