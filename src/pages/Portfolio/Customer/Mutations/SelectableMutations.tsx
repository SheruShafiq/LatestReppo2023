import { Box, Typography, List, Fade } from "@mui/material";
import React from "react";
import ListItemSection from "@/components/ListItemSection";

export type sectionItems = {
  primaryText: string;
  disabled: boolean;
  component: () => JSX.Element;
  handler: (component: JSX.Element) => void;
};

export type Section = {
  id: string;
  subtitle: string;
  items: sectionItems[];
};

export type SelectableMutationsProps = {
  sections: Section[];
};

function SelectableMutations({ sections }: SelectableMutationsProps) {
  if (!sections) return <>Loading...</>;

  const data = sections;
  
  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Typography
          variant="h1"
          fontSize={"1rem"}
          fontWeight={500}
          sx={{
            pt: 1.5,
          }}
        >
          Wat moet er gewijzigd worden?
        </Typography>
        {data.map((section: any) => (
          <Box key={section.id} sx={{ pt: "3rem" }}>
            <Typography variant="body2" color={"#6C737F"} fontSize={14}>
              {section.subtitle}
            </Typography>
            <List sx={{ width: "100%" }}>
              {section.items?.map((item: any) => (
                <ListItemSection
                  key={item.primaryText}
                  item={item}
                  handleNext={item.handler}
                />
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Fade>
  );
}

export default SelectableMutations;
