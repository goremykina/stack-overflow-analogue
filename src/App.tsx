import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import { routes } from "./routes.ts";
import MainLayout from "./layouts/MainLayout.tsx";
import AccountPage from "./pages/account/AccountPage.tsx";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./api/users.ts";
import useStore from "./store.ts";
import { Backdrop, CircularProgress } from "@mui/material";

const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            { path: routes.home, element: <HomePage /> },
            { path: routes.signUp, element: <SignUpPage /> },
            { path: routes.login, element: <LoginPage /> },
            { path: routes.account, element: <AccountPage userName='Alina' id='1' role='user'/> },
        ]
    }
])

function App() {
    const [initialized, setInitialized] = useState(false);
    const setUser = useStore(store => store.setUser);

    useEffect(() => {
        getCurrentUser()
            .then(user => setUser(user))
            .finally(() => setInitialized(true))
    });

    if (!initialized) {
        return (
            <Backdrop sx={{
                backgroundColor: (theme) => theme.palette.primary.main
            }} open={true}>
                <CircularProgress color="secondary" />
            </Backdrop>
        );
    }

    return (
        <RouterProvider router={router} />
    );
}


export default App
