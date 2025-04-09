import { FC, useEffect, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CardContent, Card, Box, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import CodeIcon from '@mui/icons-material/Code';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Post } from "../../models/post.model.ts";


interface PostProps {
    post: Post,
}

const PostCard: FC<PostProps> = ({ post }) => {
    const { user, language, code, marks } = post;
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        const { likes, dislikes } = marks.reduce((reducer, mark) => {
            if (mark.type === 'like') {
                reducer.likes++;
            } else if (mark.type === 'dislike') {
                reducer.dislikes++;
            }

            return reducer;
        }, { likes: 0, dislikes: 0 });
        setLikesCount(likes);
        setDislikesCount(dislikes);
    }, [marks]);

    return (
        <Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <PersonOutlineIcon/>
                    {user.username}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <CodeIcon />
                    {language}
                </Box>
            </Box>

            <CardContent>
                <SyntaxHighlighter language={language} style={stackoverflowLight} showLineNumbers={true}>
                    {code}
                </SyntaxHighlighter>

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
                        >
                            <Typography>{likesCount}</Typography>
                            <ThumbUpOffAltIcon />
                        </IconButton>
                        <IconButton
                            sx={{ display: 'flex', gap: 1 }}
                        >
                            <Typography>{dislikesCount}</Typography>
                            <ThumbDownOffAltIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton
                            sx={{ display: 'flex', gap: 1 }}
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