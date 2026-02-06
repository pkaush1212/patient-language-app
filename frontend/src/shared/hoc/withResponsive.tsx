import React from "react";
import { MobileView, DefaultView } from "../ResponsiveLayout";

/*
TODO: Change format, instead of going top-down, go bottom-up.
Each functional component is responsible for managing itself in different layouts.
*/
const withResponsive = (DefaultLayout: React.FC, MobileLayout: React.FC) => (
    <div>
        <MobileView>
            <MobileLayout />
        </MobileView>

        <DefaultView>
            <DefaultLayout />
        </DefaultView>
    </div>
);

export default withResponsive;
