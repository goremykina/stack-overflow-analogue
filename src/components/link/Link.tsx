import { Link as MuiLink } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import { FC, ReactNode } from "react";

interface LinkProps {
    to: string;
    children?: ReactNode;
    color?: string;
    underline?: 'none' | 'hover' | 'always';
}

const Link: FC<LinkProps> = ({ color, to, children, underline }) => {
    return (
        <MuiLink component={ReactLink} color={color} to={to} underline={underline}>
            {children}
        </MuiLink>
    );
};

export default Link;