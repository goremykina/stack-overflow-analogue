import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "../components/header/Header.tsx";

const HeaderOnlyLayout: FC = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header />
            <CssBaseline />
            <Box>
                <Outlet />
            </Box>
        </Box>
    );
}

export default HeaderOnlyLayout;