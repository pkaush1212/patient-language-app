import { Drawer, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import withResponsive from "../../shared/hoc/withResponsive";
import { useLocation } from "react-router";
import MenuItems from "./menu/MenuItems";
import { useHistory } from "react-router-dom";
import FrontendRoutes from "../../config/frontendRoutes";
import logo from "../../assets/logo.png";
import { UserTypes } from "../../config/constants";
import CreateRequestButton from "../request/create/CreateRequestButton";

interface SidebarProps {}

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    logo: {
        alignSelf: "center",
        marginLeft: "1%",
        padding: "2%",
        marginBottom: "5%",
    },
    cta: {
        alignSelf: "center",
        paddingTop: "2%",
        paddingBottom: "10%",
    },
    toolbar: theme.mixins.toolbar,
    menuItems: {
        marginLeft: "6%",
    },
}));

const Sidebar: React.FC<SidebarProps> = () => {
    // React Router
    const location = useLocation();
    const history = useHistory();

    const styles = useStyles();

    const { userInfo } = useContext(UserInfoContext);

    const defaultViewport: React.FC = () => {
        return (
            <div>
                <Drawer
                    className={styles.drawer}
                    variant="permanent"
                    classes={{
                        paper: styles.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={styles.toolbar} />

                    <div className={styles.logo}>
                        <a href={"/"}>
                            <img alt="logo" src={logo} height="100px" />
                        </a>
                    </div>

                    {userInfo?._type === UserTypes.REQUESTER && (
                        <div className={styles.cta}>
                            <CreateRequestButton />
                        </div>
                    )}

                    <div className={styles.menuItems}>
                        <MenuItems
                            activeRoute={location.pathname}
                            onMenuItemClick={(route: FrontendRoutes) => {
                                history.push(route);
                            }}
                        />
                    </div>
                </Drawer>
            </div>
        );
    };

    // No mobile view for sidebar needed, as it will condense to navbar.
    const mobileViewPort: React.FC = () => {
        return <div></div>;
    };

    return withResponsive(defaultViewport, mobileViewPort);
};

export default Sidebar;
