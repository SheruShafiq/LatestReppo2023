import { ChevronRight } from "@mui/icons-material";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Fade,
} from "@mui/material";
import React from "react";
import {
  CurrentScreenProps,
  SectionItem,
} from "../../../components/MutationDrawerParent";

const ListItemSection: React.FC<{
  item: SectionItem;
  handleNext: any;
}> = ({ item, handleNext }) => (
  <ListItem disabled={item.disabled} disablePadding disableGutters>
    <ListItemButton
      disableGutters
      component="a"
      onClick={!item.disabled ? () => handleNext(item.component) : undefined}
    >
      <ListItemText primary={item.primaryText} />
      <ChevronRight />
    </ListItemButton>
  </ListItem>
);

const MutationDrawerStep0: React.FC<CurrentScreenProps> = ({ sections }) => {
  if (!sections) return null;
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
        {sections.map((section: any) => (
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
};

export default MutationDrawerStep0;
