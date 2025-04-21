import { FC, ReactNode } from 'react';
import { Card, Typography } from "@mui/material";

interface CommentCardProps {
    children: ReactNode;
}

const CommentCard: FC<CommentCardProps> = ({ children }) => {
    return (
        <Card sx={{ padding: '10px', border: '1.5px solid rgba(0, 0, 0, 0.12);\n' + '}', overflow: 'scroll'}}>
            <Typography>{children}</Typography>
        </Card>
    );
};

export default CommentCard;