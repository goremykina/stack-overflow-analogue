import { FC, ReactNode } from "react";
import useAuth from "../hooks/use-auth";
import { Navigate } from "react-router-dom";
import { routes } from "../routes.ts";

const ProtectedLayout : FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthorized } = useAuth();

    if (!isAuthorized) {
        return (
            <Navigate to={routes.login} />
        );
    }

    return children;
};

export default ProtectedLayout;