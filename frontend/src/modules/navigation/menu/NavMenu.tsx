import React, { useContext } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Box, IconButton, makeStyles, Popover } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useLocation, useHistory } from "react-router-dom";
import MenuItems from "./MenuItems";
import FrontendRoutes from "../../../config/frontendRoutes";
import { PALETTE } from "../../../config/colors";
import CreateRequestButton from "../../request/create/CreateRequestButton";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import { UserTypes } from "../../../config/constants";

interface NavMenuProps {}

const useStyles = makeStyles(() => ({
    icon: {
        color: PALETTE.PRIMARY_ALT,
    },
    menuItems: {
        display: "flex",
        flexDirection: "column",
    },
    popover: {
        justifyContent: "space-between",
    },
}));
const NavMenu: React.FC<NavMenuProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const styles = useStyles();

    // React Router
    const history = useHistory();
    const location = useLocation();

    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <IconButton
                            aria-label="menu"
                            {...bindTrigger(popupState)}
                        >
                            <MenuIcon className={styles.icon} />
                        </IconButton>
                        <Popover
                            className={styles.popover}
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Box width="100vh">
                                {userInfo?._type === UserTypes.REQUESTER && (
                                    <CreateRequestButton />
                                )}

                                <div className={styles.menuItems}>
                                    <MenuItems
                                        activeRoute={location.pathname}
                                        onMenuItemClick={(
                                            route: FrontendRoutes
                                        ) => {
                                            popupState.setOpen(false);
                                            history.push(route);
                                        }}
                                    />
                                </div>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    );
};

export default NavMenu;
