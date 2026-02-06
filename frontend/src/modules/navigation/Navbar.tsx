import { makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { PALETTE } from "../../config/colors";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import useMobile from "../../shared/hooks/useMobile";
import NotificationButton from "../notification/NotificationButton";
import AvatarProfileMenu from "./appbar/AvatarProfileMenu";
import SignOutButton from "./appbar/SignOutButton";
import NavMenu from "./menu/NavMenu";

interface NavbarProps {}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: PALETTE.BACKGROUND_LIGHT_GREY,
        flexGrow: 2,
        paddingRight: "1%",
        zIndex: 5,

        // desktop view
        [theme.breakpoints.up("sm")]: {
            justifyContent: "flex-end",
            paddingTop: theme.spacing(1),
        },

        // mobile view
        [theme.breakpoints.down("sm")]: {
            justifyContent: "space-between",
            paddingLeft: "1%",
        },
    },
    rightItems: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
    },
    navMenu: {
        float: "left",
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "block",
        },
    },
    notif: {
        paddingLeft: "1%",
        paddingRight: "1%",
        [theme.breakpoints.down("sm")]: {
            paddingRight: "2%",
        },
    },
    btn: {
        paddingTop: ".3%",
        paddingBottom: "1%",
        [theme.breakpoints.down("sm")]: {
            paddingTop: "1%",
        },
    },
}));

const Navbar: React.FC<NavbarProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const styles = useStyles();

    const onMobileView = useMobile();

    return (
        <div className={styles.root}>
            {userInfo?.isVerified && (
                <div className={styles.navMenu}>
                    <NavMenu />
                </div>
            )}

            <div className={styles.rightItems}>
                {userInfo?.isVerified && (
                    <div className={styles.notif}>
                        <NotificationButton />
                    </div>
                )}

                <div className={styles.btn}>
                    {onMobileView ? <SignOutButton /> : <AvatarProfileMenu />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
