import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import Header from "./components/header/Header.tsx";
import SideBar from "./components/side-bar/SideBar.tsx";
import { Box, CssBaseline } from "@mui/material";
import LoginPage from "./pages/login/LoginPage.tsx";
import { routes } from "./routes.ts";

const router = createBrowserRouter([
    { path: routes.home, element: <HomePage /> },
    { path: routes.signUp, element: <SignUpPage /> },
    { path: routes.login, element: <LoginPage /> },
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
