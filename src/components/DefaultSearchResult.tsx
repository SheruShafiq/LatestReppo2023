import { Typography } from "@mui/material";
import React from "react";
import searchSVG from "../assets/images/undraw_search.svg";

const DefaultSearchResult = () => {
  return (
    <>
      <img
        src={searchSVG}
        alt=""
        style={{
          width: "215px",
        }}
      />
      <Typography
        variant="h1"
        color={"#1A202C"}
        fontWeight={600}
        fontSize={24}
        lineHeight={"32px"}
        align="center"
        sx={{
          mt: "2rem",
        }}
      >
        Zoek binnen uw portefeuille
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color={"#6C737F"}
        sx={{
          mt: "1rem",
          mb: "2rem",
        }}
      >
        Gebruik de zoekfunctie om klanten te vinden in uw portefeuille
      </Typography>
    </>
  );
};

export default DefaultSearchResult;
