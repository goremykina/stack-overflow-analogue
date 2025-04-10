import { User } from "../../models/user.model.ts";
import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

interface UserProps {
    user: User;
}

const UserCard: FC<UserProps> = ({ user }) => {
    const { username, role, id } = user;
    return (
        <Card >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Box>
                    <PersonOutlineIcon sx={{ width: '30px', height: '30px' }}/>
                </Box>
                <Box>
                    <Typography>Username: {username}</Typography>
                    <Typography>Id: {id}</Typography>
                    <Typography>Role: {role}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;