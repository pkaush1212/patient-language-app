import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { PALETTE } from "../../config/colors";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: PALETTE.PRIMARY_ALT,
    },
}));

export const LinkDuo: React.FC<LinkProps> = (props: any) => {
    const styles = useStyles();

    const { to, ...rest } = props;
    return /^https?:\/\//.test(to) ? (
        <a href={to} {...rest} target={"_blank"} rel="noopener noreferrer">
            {props.children}
        </a>
    ) : (
        <Link className={styles.link} to={to} {...rest}>
            {props.children}
        </Link>
    );
};
