import { FC, useEffect, useState } from "react";
import { Post } from "../../models/post.model.ts";
import { fetchPosts } from "../../api/posts.ts";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import PostCard from "../post-card/PostCard.tsx";
import { CommentResponse } from "../../models/comments.model.ts";

interface IPostsListProps {
    userId?: string;
}

const PostsList : FC<IPostsListProps> = ({ userId }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [areCommentsShownIds, setAreCommentsShownIds] = useState<string[]>([])

    useEffect(() => {
        const fetchDataPosts = async () => {
            setLoading(true)
            try {
                const response = await fetchPosts(currentPage, userId)
                setPosts(response.data)
                setTotalPages(response.meta.totalPages)
            } finally {
                setLoading(false);
            }
        }
        fetchDataPosts();
    }, [currentPage, userId]);

    const handleToggleCommentsRequested = (id: string) => {
        if (areCommentsShownIds.includes(id)) {
            const resultIds = areCommentsShownIds.filter((commentId) => commentId !== id)
            setAreCommentsShownIds(resultIds)
        } else {
            setAreCommentsShownIds([...areCommentsShownIds, id])
        }
    }

    const handleCommentAdded = (post: Post, comment: CommentResponse) => {
        post.comments = [...post.comments, comment];
    }

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                <Typography sx={{ fontSize: '25px' }} >Welcome to Codelang!</Typography>
                <Pagination
                    sx={{ marginBottom: "1rem" }}
                    count={totalPages}
                    onChange={(_event, page) => setCurrentPage(page)}
                />
            </Box>

            {loading
                ? <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh'
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
                : <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        flexDirection: 'column',
                    }}>
                    {posts.map((post, index) => (
                        <PostCard
                            post={post}
                            key={index}
                            showViewButton={true}
                            enableCommentsScroll={true}
                            areCommentsShown={areCommentsShownIds.includes(post.id)}
                            onToggleCommentsRequested={() => handleToggleCommentsRequested(post.id)}
                            onCommentAdded={comment => handleCommentAdded(post, comment)}
                        />
                    ))}
                </Box>
            }
        </Box>
    );
};

export default PostsList;