import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import Header from "./components/header/Header.tsx";
import SideBar from "./components/side-bar/SideBar.tsx";
import { Box, CssBaseline } from "@mui/material";

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/register", element: <RegisterPage /> }
])

function App() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header />
            <CssBaseline />
            <Box sx={{ display: "flex", flexGrow: 1, minHeight: "0" }}>
                <SideBar />
                <Box sx={{ flexGrow: 1, padding: 3, overflow: "auto", minHeight: 0 }}>
                    <RouterProvider router={router} />
                </Box>
            </Box>
        </Box>
    );
}


export default App
