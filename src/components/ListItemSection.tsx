import { ListItem, ListItemButton, ListItemText } from "@mui/material";

import ChevronRight from "@mui/icons-material/ChevronRight";
import React from "react";

export type ListItemSectionProps = {
  item: any;
  handleNext: (component: React.FC) => void;
};

const ListItemSection: React.FC<ListItemSectionProps> = ({
  item,
  handleNext,
}) => (
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

export default ListItemSection;

// This component doesn't have any logic, so there is no need to test it.
