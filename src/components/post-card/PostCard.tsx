import { FC, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CardContent, Card, Box, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import CodeIcon from '@mui/icons-material/Code';

interface PostProps {
    code: string,
    language: string,
}

const PostCard: FC<PostProps> = ({ code, language }) => {
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)

    return (
        <Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <PersonOutlineIcon/>
                    User
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <CodeIcon />
                    {language}
                </Box>
            </Box>

            <CardContent>
                <Box
                    component="pre"
                    sx={{
                        backgroundColor: '#f5f5f5',
                        padding: 2,
                        borderRadius: 1,
                        overflowX: 'scroll'
                    }}
                >
                    {code}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <IconButton
                            sx={{ display: 'flex', gap: 1 }}
                            onClick={() => setLikesCount(likesCount + 1)}
                        >
                            <Typography>{likesCount}</Typography>
                            <ThumbUpOffAltIcon />
                        </IconButton>
                        <IconButton
                            sx={{ display: 'flex', gap: 1 }}
                            onClick={() => setDislikesCount(dislikesCount - 1)}
                        >
                            <Typography>{dislikesCount}</Typography>
                            <ThumbDownOffAltIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton
                            sx={{ display: 'flex', gap: 1 }}
                            onClick={() => setCommentCount(commentCount +1)}
                        >
                            <Typography>{commentCount}</Typography>
                            <CommentIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard;