import { Box, makeStyles, Popover, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import AvatarProfileMenuContainer from "./AvatarProfileMenuContainer";
import AvatarIcon from "../../../ui/Elements/AvatarIcon";
import { UserDetailsContext } from "../../../shared/contexts/UserDetailsContextProvider";

interface AvatarProfileMenuProps {}

const useStyles = makeStyles((theme) => ({
    profileMenu: {
        display: "flex",
        flex: 1,
    },
    text: {
        display: "flex",
        alignSelf: "center",
    },
    initials: {},
    popover: {
        justifyContent: "space-between",
    },
    avatarMenu: {
        width: "20vw",
        [theme.breakpoints.down("md")]: {
            width: "30vw",
        },
    },
}));

const AvatarProfileMenu: React.FC<AvatarProfileMenuProps> = () => {
    const { userDetail } = useContext(UserDetailsContext);

    const styles = useStyles();

    return (
        <PopupState variant="popover">
            {(popupState) => (
                <div>
                    <div
                        className={styles.profileMenu}
                        {...bindTrigger(popupState)}
                    >
                        <div className={styles.text}>
                            <Typography>
                                Hello{userDetail && `, ${userDetail.firstName}`}
                            </Typography>
                            <KeyboardArrowDownIcon />
                            &nbsp;
                        </div>
                        <div className={styles.initials}>
                            <AvatarIcon
                                size="small"
                                content={userDetail?.initials}
                            />
                        </div>
                    </div>
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
                        <Box className={styles.avatarMenu}>
                            {userDetail && (
                                <AvatarProfileMenuContainer
                                    userDetail={userDetail}
                                />
                            )}
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
};

export default AvatarProfileMenu;
