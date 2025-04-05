import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts.ts";
import Post from "../../components/post/Post.tsx";
import { PostModel } from "../../models/post.model.ts";

const HomePage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        fetchPosts()
            .then(response => setPosts(response.data));
    }, []);

    return (
        <>
            {posts.map(post => (<Post language={post.language} code={post.code} />))}
        </>
    );
};

export default HomePage;