import React from "react";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useBulbNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/bulb";
import { makeStyles, Typography } from "@material-ui/core";
import { PALETTE } from "../../config/colors";

interface NavMenuPillsProps {
    items: string[];
    active: string;
    setActive: any;
}

const useStyles = makeStyles(() => ({
    navItem: {
        "&::active": {
            background: PALETTE.PRIMARY_ALT,
        },
    },
}));

const NavMenuPills: React.FC<NavMenuPillsProps> = ({
    items,
    active,
    setActive,
}) => {
    const styles = useStyles();

    return (
        // @ts-ignore
        <NavMenu gutter={1} useStyles={useBulbNavigationMenuStyles}>
            {items.map((item) => {
                return (
                    <NavItem
                        key={item}
                        className={styles.navItem}
                        active={active === item ? true : false}
                        onClick={() => setActive(item)}
                    >
                        <Typography>{item}</Typography>
                    </NavItem>
                );
            })}
        </NavMenu>
    );
};

export default NavMenuPills;
