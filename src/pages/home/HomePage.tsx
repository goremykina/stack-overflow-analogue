import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts.ts";
import PostCard from "../../components/post-card/PostCard.tsx";
import { PostModel } from "../../models/post.model.ts";
import { Box } from "@mui/material";

const HomePage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);

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
            {posts.map(post => (<PostCard language={post.language} code={post.code} />))}
        </Box>
    );
};

export default HomePage;