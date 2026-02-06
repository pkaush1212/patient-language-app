import { useMediaQuery, useTheme } from "@material-ui/core";

const useMobile = () => {
    const theme = useTheme();
    const onMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    return onMobileView;
};

export default useMobile;
