import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "../components/header/Header.tsx";
import SideBar from "../components/side-bar/SideBar.tsx";

const MainLayout: FC = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header />
            <CssBaseline />
            <Box sx={{ display: "flex", flexGrow: 1, minHeight: "0" }}>
                <SideBar />
                <Box sx={{ flexGrow: 1, padding: 3, overflow: "auto", minHeight: 0 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;