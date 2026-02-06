import {
    CALENDAR_NAV_MENU,
    DASHBOARD_NAV_MENU,
    MESSAGES_NAV_MENU,
    SETTINGS_NAV_MENU,
} from "../../../../config/constants";
import FrontendRoutes from "../../../../config/frontendRoutes";
import { MenuItem } from "../MenuItems";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import {
    CalendarToday,
    Message,
    DashboardOutlined,
    CalendarTodayOutlined,
    MessageOutlined,
    SettingsOutlined,
} from "@material-ui/icons";
import { MessagesMenuIcon } from "./MessagesMenuIcon";

export const getAllMenuItems = (): MenuItem[] => {
    return [
        {
            text: DASHBOARD_NAV_MENU,
            iconActive: <DashboardIcon />,
            icon: <DashboardOutlined />,
            route: FrontendRoutes.DASHBOARD_ROUTE,
        },
        {
            text: CALENDAR_NAV_MENU,
            iconActive: <CalendarToday />,
            icon: <CalendarTodayOutlined />,
            route: FrontendRoutes.CALENDAR_ROUTE,
        },
        {
            text: MESSAGES_NAV_MENU,
            iconActive: <Message />,
            icon: <MessagesMenuIcon />,
            route: FrontendRoutes.MESSAGES_ROUTE,
        },
        {
            text: SETTINGS_NAV_MENU,
            iconActive: <SettingsIcon />,
            icon: <SettingsOutlined />,
            route: FrontendRoutes.SETTINGS_ROUTE,
        },
    ];
};
