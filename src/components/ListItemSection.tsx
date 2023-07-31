import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {
  CurrentScreenProps,
  SectionItem,
} from "@/pages/Portfolio/Customer/Mutations/Mutations";

export type ListItemSectionProps = {
  item: SectionItem;
  handleNext: (component: React.FC<CurrentScreenProps>) => void;
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
