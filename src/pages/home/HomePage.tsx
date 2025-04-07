import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts.ts";
import Post from "../../components/post/Post.tsx";
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
            {posts.map(post => (<Post language={post.language} code={post.code} />))}
        </Box>
    );
};

export default HomePage;