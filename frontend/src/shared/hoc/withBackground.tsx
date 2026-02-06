import React from "react";

const withBackground = <P extends {}>(
    Component: React.ComponentType<P>
): React.FC<P> => {
    return (props: P) => {
        return (
            <div style={styles.background}>
                <Component key={1} {...props} />
            </div>
        );
    };
};

const styles = {
    background: {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: "#F9F9F9",
        zIndex: -1001,
    },
};

export default withBackground;
