import { User, UserStatistics } from "../../models/user.model.ts";
import { FC, useState } from "react";
import { Box, Card, CardContent, CircularProgress, IconButton, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchStatistics } from "../../api/users.ts";

interface UserProps {
    user: User;
}

const UserCard: FC<UserProps> = ({ user }) => {
    const { username, role, id } = user;
    const [statistics, setStatistics] = useState<UserStatistics | null>(null);
    const [loading, setLoading] = useState(false);
    const [isShow, setIsShow] = useState(false)

    const showInfo = async () => {
        if (statistics) {
            return;
        }

        setLoading(true);

        try {
            const response=  await fetchStatistics(id)
            setStatistics(response.statistic)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{
                    display: 'flex', alignItems: 'center', gap: '1.5rem'
                }}>
                    <Box>
                        <PersonOutlineIcon sx={{ width: '30px', height: '30px' }}/>
                    </Box>
                    <Box>
                        <Typography>Username: {username}</Typography>
                        <Typography>Id: {id}</Typography>
                        <Typography>Role: {role}</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton onClick={() => {
                        setIsShow(!isShow);
                        showInfo();
                    }}>
                        <ExpandMoreIcon sx={{
                            transition: 'transform 0.3s ease',
                            transform: `rotate(${isShow ? '180' : '0'}deg)`
                        }} />
                    </IconButton>
                </Box>

            </CardContent>

            {(loading && isShow) &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '150px'
                    }}
                >
                    <CircularProgress size={30} />
                </Box>
            }

            {(statistics && isShow) &&
                <>
                    <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>User statistics:</Typography>
                    <CardContent sx={{ display: "grid", columnGap: '20px', gridTemplateColumns: "max-content 1fr" }}>
                        <Typography>SnippetsCount: {statistics.snippetsCount}</Typography>
                        <Typography>Rating: {statistics.rating}</Typography>
                        <Typography>CommentsCount: {statistics.commentsCount}</Typography>
                        <Typography>LikesCount: {statistics.likesCount}</Typography>
                        <Typography>DislikesCount: {statistics.dislikesCount}</Typography>
                        <Typography>QuestionsCount: {statistics.questionsCount}</Typography>
                        <Typography>CorrectAnswersCount: {statistics.correctAnswersCount}</Typography>
                        <Typography>RegularAnswersCount: {statistics.regularAnswersCount}</Typography>
                    </CardContent>
                </>
            }
        </Card>
    );
};

export default UserCard;