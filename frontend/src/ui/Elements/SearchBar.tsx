import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import Search from "@material-ui/icons/Search";
import { KeyboardArrowRight } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

interface SearchBarProps {}

const useStyles = makeStyles((theme) => ({
    searchBar: {
        backgroundColor: "#F7F8F7",
        width: "65%",
        height: "50px",
        marginTop: "1%",
        marginLeft: "1%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    startAdornment: {
        paddingLeft: "1%",
        paddingRight: "1%",
    },
    endAdornment: {
        paddingRight: "1%",
    },
}));

const SearchBar: React.FC<SearchBarProps> = () => {
    const styles = useStyles();
    const [endVisible, setEndVisible] = useState(false);

    return (
        <InputBase
            className={styles.searchBar}
            onFocus={() => setEndVisible(true)}
            disabled={true}
            onBlur={() => setEndVisible(false)}
            placeholder={"Tip: You can use the date filters to query your upcoming appointments..."}
            startAdornment={<Search className={styles.startAdornment} />}
            endAdornment={
                endVisible ? (
                    <KeyboardArrowRight className={styles.endAdornment} />
                ) : (
                    <></>
                )
            }
        />
    );
};

export default SearchBar;
