import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import {
  selectAccountMenuState,
  setAccountMenuState,
} from "../lib/redux/slices/layoutSlice";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { IconDropDownMenuProps } from "./DefaultPageLayout";

const IconDropDownMenu = ({
  menuItemProps,
  elementId,
}: IconDropDownMenuProps) => {
  const menuItems = menuItemProps;
  const open = useAppSelector(selectAccountMenuState);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setAccountMenuState(false));
  };

  return (
    <Menu
      id="basic-menu"
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      anchorEl={elementId}
      elevation={3}
      aria-label="menu"
    >
      {menuItems.map((item: any) => (
        <MenuItem key={item.id} onClick={item.onClick}>
          <ListItemIcon>
            <ListItemIcon>{item.icon}</ListItemIcon>
          </ListItemIcon>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default IconDropDownMenu;
