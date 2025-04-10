import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts.ts";
import PostCard from "../../components/post-card/PostCard.tsx";
import { Post } from "../../models/post.model.ts";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";

const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataPosts = async () => {
            setLoading(true)
            try {
                await fetchPosts(currentPage)
                    .then(response => {
                        setPosts(response.data);
                        setTotalPages(response.meta.totalPages);});
            } finally {
                setLoading(false);
            }
        }

        fetchDataPosts();
    }, [currentPage]);

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
                        {posts.map(post => (
                            <PostCard post={post} />
                        ))}
                </Box>
            }
        </Box>
    );
};

export default HomePage;