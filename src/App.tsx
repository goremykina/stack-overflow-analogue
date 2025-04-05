import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import { routes } from "./routes.ts";
import MainLayout from "./layouts/MainLayout.tsx";

const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            { path: routes.home, element: <HomePage /> },
            { path: routes.signUp, element: <SignUpPage /> },
            { path: routes.login, element: <LoginPage /> },
        ]
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    );
}


export default App
