import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts.ts";
import PostCard from "../../components/post-card/PostCard.tsx";
import { Post } from "../../models/post.model.ts";
import { Box } from "@mui/material";

const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts()
            .then(response => setPosts(response.data));
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
            minHeight: 'unset',
        }}>
            {posts.map(post => (<PostCard post={post} />))}
        </Box>
    );
};

export default HomePage;