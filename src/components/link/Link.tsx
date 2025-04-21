import { Link as MuiLink, Theme } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import { FC, ReactNode } from "react";
import { SxProps } from "@mui/system/styleFunctionSx";

interface LinkProps {
    to: string;
    children?: ReactNode;
    sx?: SxProps<Theme>;
    color?: string;
    underline?: 'none' | 'hover' | 'always';
}

const Link: FC<LinkProps> = ({ color, to, children, underline, sx }) => {
    return (
        <MuiLink component={ReactLink} color={color} to={to} underline={underline} sx={sx}>
            {children}
        </MuiLink>
    );
};

export default Link;