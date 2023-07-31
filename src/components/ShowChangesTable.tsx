import React from "react";
import { Box, Typography } from "@mui/material";

export type DataObject = { [key: string]: string | undefined };

export type ShowChangesTableProps = {
  oldData?: DataObject;
  newData: DataObject;
  sideLabels?: string[];
};

const ShowChangesTable: React.FC<ShowChangesTableProps> = ({
  oldData,
  newData,
  sideLabels = [],
}) => {
  const keys = Object.keys(newData);

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row">
        <Box
          mt={"3rem"}
          display="flex"
          flexDirection="column"
          mr="1.5rem"
          flex={1}
        >
          {keys.map((key, index) => (
            <Typography
              width={"100%"}
              key={index}
              textAlign="right"
              pt="0.5rem"
              pb="0.5rem"
            >
              {sideLabels[index] || key}
            </Typography>
          ))}
        </Box>
        <Box display="flex" flexDirection="column" mr="1.5rem" flex={1}>
          <Typography padding="0.5rem" mb={"0.5rem"} fontWeight={"500"}>
            Oudegegevens
          </Typography>
          {keys.map((key, index) => (
            <Typography width={"100%"} key={index} padding="0.5rem">
              {oldData?.[key] || "-"}
            </Typography>
          ))}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          ml="2rem"
          pr="2rem"
          width={"100%"}
          flex={1}
        >
          <Typography
            pt="0.5rem"
            pb="0.5rem"
            pl="1rem"
            mb={"0.5rem"}
            fontWeight={"500"}
          >
            Nieuwegegevens
          </Typography>
          {keys.map((key, index) => (
            <Typography
              key={index}
              pt="0.5rem"
              pb="0.5rem"
              pl="1rem"
              bgcolor="#E4EAF2"
              pr={"4rem"}
              width={"100%"}
            >
              {newData[key]}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ShowChangesTable;
