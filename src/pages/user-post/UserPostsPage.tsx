import PostsList from "../../components/posts-list/PostsList.tsx";
import useStore from "../../store.ts";


const UserPostsPage = () => {
    const userId = useStore(store => store.user?.id);
    return (<PostsList userId={userId} />);
};

export default UserPostsPage;