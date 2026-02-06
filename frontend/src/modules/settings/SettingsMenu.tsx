import {
    List,
    ListItemText,
    ListItem,
    Theme,
    Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { SettingsSubPages } from "../../pages/settings";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { AccountCircle, Security } from "@material-ui/icons";

export interface SettingsMenuProps {
    activeSubPage: SettingsSubPages;
    setActiveSubPage: (activeSubPage: SettingsSubPages) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: "5%",
    },
    listItem: {
        borderRadius: 25,
    },
}));

const SettingsMenu: React.FC<SettingsMenuProps> = ({
    activeSubPage,
    setActiveSubPage,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <div>
                <List component="nav" aria-label="main settings">
                    <ListItem
                        button
                        className={styles.listItem}
                        selected={activeSubPage === "profile"}
                        onClick={() => setActiveSubPage("profile")}
                    >
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <Divider flexItem />
                    <ListItem
                        button
                        className={styles.listItem}
                        selected={activeSubPage === "security"}
                        onClick={() => setActiveSubPage("security")}
                    >
                        <ListItemIcon>
                            <Security />
                        </ListItemIcon>
                        <ListItemText primary="Security" />
                    </ListItem>
                </List>
            </div>
        </div>
    );
};

export default SettingsMenu;
