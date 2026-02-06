import { useMediaQuery } from "react-responsive";

const MobileView = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
};

const DefaultView = ({ children }) => {
    // Desktop, Laptop, Tablet view
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
};

export { MobileView, DefaultView };
