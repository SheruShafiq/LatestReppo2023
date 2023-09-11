import {
  Avatar,
  Box,
  Divider,
  Fade,
  List,
  ListItem,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import ChevronRight from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { RoutePaths } from "../lib/types/RoutesPaths";
import { SearchResultType } from "../lib/types/SearchResultType";
import { motion } from "framer-motion";
import sleep from "../lib/helper/sleep";

export type SearchResultsListProps = {
  data: SearchResultType[];
};

const SearchResultsList = ({ data }: SearchResultsListProps) => {
  return (
    <Stack gap={"8px"} width={"100%"}>
      {data.map((item, index) => {
        const adjustedIndex = index + 1;

        return (
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: adjustedIndex * 0.3 }}
            animate={{
              opacity: [0, 1],
              x: [-20, 0],
            }}
            key={item.id}
          >
            <Box>
              <ListItem>
                <Link
                  to={`/portfolio/${item.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                  }}
                >
                  <Box>
                    <Avatar
                      sx={{
                        position: "relative",
                        top: "0rem",
                        backgroundColor: "#E4EAF2",
                        color: "#94A3B8",
                      }}
                    />
                  </Box>
                  <Box paddingLeft={"1.5rem"}>
                    <Box display={"flex"}>
                      <Typography
                        fontWeight={500}
                        paddingRight={"1rem"}
                        fontSize={"16px"}
                      >
                        {item.first_name} {item.last_name}
                      </Typography>
                      <Typography color={"#6C737F"}>
                        {item.birthdate}
                      </Typography>
                    </Box>
                    <Typography color={"#6C737F"}>{item.city}</Typography>
                    <Typography
                      color={"#6C737F"}
                      position={"relative"}
                      top={-3}
                    >
                      {item.postal_code}
                    </Typography>
                  </Box>
                  <Box position={"absolute"} right={"1rem"}>
                    <ChevronRight />
                  </Box>
                </Link>
              </ListItem>

              <Divider />
            </Box>
          </motion.div>
        );
      })}
    </Stack>
  );
};

export default SearchResultsList;
