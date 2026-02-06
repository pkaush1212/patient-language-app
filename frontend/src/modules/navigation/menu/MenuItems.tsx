import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import { getAllMenuItems } from "./utils/MenuUtils";
import FrontendRoutes from "../../../config/frontendRoutes";
import cx from "clsx";
import { PALETTE } from "../../../config/colors";

export interface MenuItem {
    text: string;
    icon: any;
    iconActive: any;
    route: FrontendRoutes;
}

const useStyles = makeStyles((theme) => ({
    activeItem: {
        color: PALETTE.PRIMARY_ALT,
    },
    inactiveItem: {},
    text: {},
}));

interface MenuItemsProps {
    activeRoute: string;
    onMenuItemClick: (route: FrontendRoutes) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({
    activeRoute,
    onMenuItemClick,
}) => {
    const styles = useStyles();
    const menuItems: MenuItem[] = getAllMenuItems();

    return (
        <List>
            {menuItems?.map(({ text, icon, iconActive, route }: MenuItem) => {
                const isActive = activeRoute === route;

                return (
                    <ListItem
                        style={{ height: "5vh" }}
                        button
                        key={text}
                        onClick={() => {
                            onMenuItemClick(route);
                        }}
                    >
                        <ListItemIcon
                            className={
                                isActive
                                    ? styles.activeItem
                                    : styles.inactiveItem
                            }
                        >
                            {isActive ? iconActive : icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={text}
                            className={cx(
                                isActive
                                    ? styles.activeItem
                                    : styles.inactiveItem,
                                styles.text
                            )}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default MenuItems;
