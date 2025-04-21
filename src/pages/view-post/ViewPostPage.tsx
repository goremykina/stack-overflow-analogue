import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPost } from "../../api/posts.ts";
import { Post } from "../../models/post.model.ts";
import PostCard from "../../components/post-card/PostCard.tsx";
import { Box, CircularProgress } from "@mui/material";
import { CommentResponse } from "../../models/comments.model.ts";

const ViewPostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post>();
    const [areCommentsShown, setAreCommentsShown] = useState(true)

    useEffect(() => {
        const fetchDataPost = async () => {
            setLoading(true)

            const response = await fetchPost(postId!)
            setPost(response);
            setLoading(false);
        }
        fetchDataPost();
    }, [postId]);

    const handleToggleCommentsRequested = () => {
        setAreCommentsShown(!areCommentsShown)
    }

    const handleCommentAdded = (comment: CommentResponse) => {
        post!.comments = [...post!.comments, comment];
    }

    return (
        <Box sx={{ height: '100%' }}>
            {loading
                ? <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
                : post && (
                    <PostCard
                        post={post}
                        areCommentsShown={areCommentsShown}
                        onToggleCommentsRequested={handleToggleCommentsRequested}
                        onCommentAdded={handleCommentAdded}
                    />
                )
            }
        </Box>
    )
};

export default ViewPostPage;
