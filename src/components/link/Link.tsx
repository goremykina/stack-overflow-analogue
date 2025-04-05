import { Link as MuiLink } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import { FC, ReactNode } from "react";

interface LinkProps {
    to: string;
    color?: 'primary' | 'secondary';
    children?: ReactNode;
}

const Link: FC<LinkProps> = ({ color, to, children }) => {
    return (
        <MuiLink component={ReactLink} color={color} to={to}>
            {children}
        </MuiLink>
    );
};

export default Link;