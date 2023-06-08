// src/components/LeftSide.tsx
import { Box } from "@mui/material";
import React from "react";
import News from "../../components/News";
import { NewsType } from "../../lib/types/NewsType";

interface LeftSideProps {
  backgroundImage: string;
  news: NewsType[] | undefined;
  size: { width: number; height: number };
}

const LeftSide: React.FC<LeftSideProps> = ({ backgroundImage, news, size }) => (
  <Box
    sx={{
      flex: 2,
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      justifyContent: {
        xs: "flex-start",
        sm: "flex-start",
        md: "flex-end",
        lg: "flex-end",
        xl: "flex-end",
      },
      height: "auto",
    }}
  >
    {size.width <= 600 ? null : <News articles={news} />}
  </Box>
);

export default LeftSide;
