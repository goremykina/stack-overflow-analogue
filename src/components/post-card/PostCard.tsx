import { FC, useEffect, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CardContent, Card, Box, IconButton, Typography, TextField, Button } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import CodeIcon from '@mui/icons-material/Code';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Post } from "../../models/post.model.ts";
import { addMarks } from "../../api/posts.ts";
import useStore from "../../store.ts";
import theme from "../../theme.ts";
import CommentCard from "../comment-card/CommentCard.tsx";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Link from '../link/Link.tsx'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addComment } from "../../api/comments.ts";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { CommentResponse } from "../../models/comments.model.ts";

interface PostProps {
    post: Post,
    areCommentsShown: boolean,
    showViewButton?: boolean,
    enableCommentsScroll?: boolean,
    onToggleCommentsRequested: () => void,
    onCommentAdded: (comment: CommentResponse) => void,
}

const schema = z.object({
    comment: z.string().nonempty(),
});
type Schema = z.infer<typeof schema>;

const PostCard: FC<PostProps> = ({ post, areCommentsShown, onToggleCommentsRequested, showViewButton, onCommentAdded, enableCommentsScroll }) => {
    const { user, language, code, marks, comments } = post;
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)
    const currentUserId = useStore(store => store.user?.id);
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        reset
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            comment: '',
        },
        disabled: loading
    });

    useEffect(() => {
        const { likes, dislikes } = marks.reduce((reducer, mark) => {
            if (mark.type === 'like') {
                reducer.likes++;

                if (mark.user.id === currentUserId) {
                    setIsLike(true)
                }

            } else if (mark.type === 'dislike') {
                reducer.dislikes++;

                if (mark.user.id === currentUserId) {
                    setIsDislike(true)
                }
            }

            return reducer;
        }, { likes: 0, dislikes: 0 });
        setLikesCount(likes);
        setDislikesCount(dislikes);
    }, [currentUserId, marks]);

    const addLikes = async() => {
        if (isLike) {
            return;
        }

        setLikesCount((prev) => prev + 1);
        if (isDislike) {
            setIsDislike(false)
            setDislikesCount(prev => prev - 1)
        }

        setIsLike(true)

        await addMarks({
            mark: "like"
        }, post.id)
    }

    const addDislikes = async() => {
        if (isDislike) {
            return;
        }

        setDislikesCount((prev) => prev + 1);

        if (isLike) {
            setIsLike(false)
            setLikesCount(prev => prev - 1)
        }

        setIsDislike(true)

        await addMarks({
            mark: "dislike",
        }, post.id)
    }

    const onSubmit = async (data: Schema) => {
        try {
            setLoading(true)
            const newComment = await addComment({
                content: data.comment,
                snippetId: post.id
            })

            onCommentAdded(newComment);
            reset();
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '.7rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <PersonOutlineIcon/>
                    {user.username}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <CodeIcon />
                    {language}
                </Box>
            </Box>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {currentUserId === user.id &&
                        <Link color={'inherit'} underline={'none'} to={`/edit-post/${post.id}`}>
                            <ModeEditOutlineOutlinedIcon/>
                        </Link>
                    }
                </Box>

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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.7rem'
                    }}>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton
                                onClick={addLikes}
                                sx={{ display: 'flex', gap: '0.4rem',  }}
                            >
                                <Typography>{likesCount}</Typography>
                                <ThumbUpOffAltIcon sx={{ color: isLike ? `${theme.palette.secondary.contrastText}` : '' }} />
                            </IconButton>
                            <IconButton
                                onClick={addDislikes}
                                sx={{ display: 'flex', gap: '0.4rem' }}
                            >
                                <Typography>{dislikesCount}</Typography>
                                <ThumbDownOffAltIcon sx={{ color: isDislike ? `${theme.palette.secondary.light}` : '' }}/>
                            </IconButton>
                        </Box>

                        {showViewButton &&
                            <Link color={'inherit'} underline={'none'} to={`/post/${post.id}`} sx={{ display: 'flex' }}>
                                <VisibilityOutlinedIcon />
                            </Link>
                        }
                    </Box>
                    <Box>
                        <IconButton
                            onClick={onToggleCommentsRequested}
                            sx={{ display: 'flex', gap: 1 }}
                        >
                            <Typography>{comments.length}</Typography>
                            <CommentIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={enableCommentsScroll ? { maxHeight: '300px', overflow: 'scroll' } : {}}>
                    {areCommentsShown &&
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            {comments.map((comment, index) => (
                                <CommentCard key={index}>{comment.content}</CommentCard>
                            ))}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    control={control}
                                    name="comment"
                                    render={({
                                        field: { onChange, onBlur, value, name },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            fullWidth
                                            label="Comment"
                                            variant="outlined"
                                            margin="normal"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            name={name}
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth sx={{ mt: 2 }}
                                    loading={loading}
                                >
                                    Add comment
                                </Button>
                            </form>

                        </CardContent>
                    }

                    {(areCommentsShown && comments.length === 0) &&
                        <Typography sx={{textAlign: 'center', fontSize: '1.15rem' }}>There are no comments yet</Typography>
                    }
                </Box>

            </CardContent>
        </Card>
    );
};

export default PostCard;