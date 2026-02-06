import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import FrontendRoutes from "../../../config/frontendRoutes";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import { PALETTE } from "../../../config/colors";
import AvatarIcon from "../../../ui/Elements/AvatarIcon";
import { IUserDetail } from "../../../shared/contexts/UserDetailsContextProvider";
import { UserTypes } from "../../../config/constants";

interface AvatarProfileMenuContainerProps {
    userDetail: IUserDetail;
}

const useStyles = makeStyles(() => ({
    initials: {
        alignSelf: "center",
    },
    popover: {
        justifyContent: "space-between",
    },
    avatarMenu: {
        padding: "2%",
        marginTop: "3%",
        display: "flex",
        flexDirection: "column",
    },
    avatarMenuInfo: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },
    name: {
        paddingTop: "2%",
        fontSize: 12,
        alignSelf: "center",
    },
    email: {
        color: "#979797",
        fontSize: 12,
        alignSelf: "center",
        paddingBottom: "2%",
    },
    userType: {
        color: "#979797",
        fontSize: 10,
        alignSelf: "center",
        paddingBottom: '2%'
    },
    listItem: {
        color: PALETTE.PRIMARY_ALT,
    },
    menuIcon: {
        color: PALETTE.PRIMARY_ALT,
    },
    divider: {
        maxWidth: "96%",
        paddingLeft: "2%",
        paddingRight: "2%",
    },
}));

const AvatarProfileMenuContainer: React.FC<AvatarProfileMenuContainerProps> = ({
    userDetail,
}) => {
    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const styles = useStyles();
    const history = useHistory();

    return (
        <div className={styles.avatarMenu}>
            <div className={styles.avatarMenuInfo}>
                <div className={styles.initials}>
                    <AvatarIcon
                        size="small"
                        content={userDetail?.initials}
                    ></AvatarIcon>
                </div>

                <div className={styles.name}>
                    <Typography>
                        {userDetail?.firstName} {userDetail?.lastName}
                    </Typography>
                </div>

                <div className={styles.email}>
                    <Typography>{userDetail?.email}</Typography>
                </div>

                <div className={styles.userType}>
                    <Typography variant='subtitle2'>{userDetail?.userType === UserTypes.INTERPRETER ? "Interpreter" : "Service Requester"}</Typography>
                </div>
            </div>
            <div className={styles.divider}>
                <Divider className={styles.divider} />
            </div>
            <div>
                <List>
                    <ListItem
                        className={styles.listItem}
                        button
                        key="Sign Out"
                        onClick={() => {
                            setUserInfo(null);
                        }}
                    >
                        <ListItemText primary="Sign Out" />
                        <ListItemIcon>
                            <ExitToAppIcon className={styles.menuIcon} />
                        </ListItemIcon>
                    </ListItem>

                    {userInfo?.isVerified && (
                        <ListItem
                            className={styles.listItem}
                            button
                            key="Settings"
                            onClick={() => {
                                history.push(FrontendRoutes.SETTINGS_ROUTE);
                            }}
                        >
                            <ListItemText primary="Settings" />
                            <ListItemIcon>
                                <SettingsIcon className={styles.menuIcon} />
                            </ListItemIcon>
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    );
};

export default AvatarProfileMenuContainer;
