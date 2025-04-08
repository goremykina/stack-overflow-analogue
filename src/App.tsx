import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import { routes } from "./routes.ts";
import ProtectedSideBarLayout from "./layouts/ProtectedSideBarLayout.tsx";
import AccountPage from "./pages/account/AccountPage.tsx";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./api/users.ts";
import useStore from "./store.ts";
import { Backdrop, CircularProgress } from "@mui/material";
import HeaderOnlyLayout from "./layouts/HeaderOnlyLayout.tsx";
import SideBarLayout from "./layouts/SideBarLayout.tsx";

const router = createBrowserRouter([
    {
        Component: HeaderOnlyLayout,
        children: [
            { path: routes.signUp, element: <SignUpPage /> },
            { path: routes.login, element: <LoginPage /> },
        ]
    },
    {
        Component: SideBarLayout,
        children: [
            { path: routes.home, element: <HomePage /> },
        ]
    },
    {
        Component: ProtectedSideBarLayout,
        children: [
            { path: routes.account, element: <AccountPage /> },
        ]
    },

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
