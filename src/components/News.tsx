import { Box, Divider, Fade, Link, Typography } from "@mui/material";

import React from "react";

export type NewsProps = {
  articles:
    | {
        title?: string;
        content: string;
        link?: string;
      }[]
    | undefined;
  onMobile?: boolean;
};

export type ArticleType =
  | {
      title: string;
      content: string;
      link?: string;
    }[]
  | undefined;

const News = ({ articles, onMobile }: NewsProps) => {
  if (articles === undefined) {
    return null;
  }
  return (
    <Fade in={true} timeout={1500}>
      <Box
        sx={{
          margin: onMobile ? "0rem" : "2rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: onMobile ? "white" : "rgba(0,0,0,0.6)",
          backdropFilter: "blur(5px)",
          color: onMobile ? "black" : "white",
          padding: onMobile ? "0rem" : "1.5rem",
          paddingTop: onMobile ? "1rem" : null,
        }}
        data-testid="news-container"
      >
        <Typography paddingBottom={"0.5rem"} fontSize={14}>
          <b>Laatste nieuws</b>
        </Typography>
        <Divider
          sx={{
            bgcolor: onMobile ? null : "white",
          }}
        />
        {articles.map((article, index) => (
          <Box key={index}>
            <Typography
              variant="h6"
              paddingBottom={"0.5rem"}
              paddingTop={index === 0 ? "0.5rem" : "2rem"}
              fontSize={18}
              fontWeight={600}
            >
              {article?.title}
            </Typography>
            <Typography paddingBottom={"0.5rem"}>{article.content}</Typography>
            <Link
              href={article.link}
              color={onMobile ? "#000" : "#fff"}
              underline={"none"}
            >
              <Typography>{"lees verder >"}</Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Fade>
  );
};

export default News;
