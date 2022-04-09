import {AppBar, Toolbar, Typography} from "@mui/material";
import PageMenu from "./PageMenu";
import React from "react";

export default function Header({orgs, selectedOrgIndex, setSelectedOrgIndex}) {
    return <AppBar position="static">
        <Toolbar>
            <PageMenu orgs={orgs} selectedOrgIndex={selectedOrgIndex} setSelectedOrgIndex={setSelectedOrgIndex}/>
            <Typography variant="h6">Diegesis Server Admin</Typography>
        </Toolbar>
    </AppBar>
}
