import { api } from './api';
import { Post } from "../models/post.model.ts";
import { QueryResponse } from "../models/response.model.ts";

export const fetchPosts = async () => {
    const response = await api.get<QueryResponse<Post[]>>('snippets');
    const { data } = await response.json();

    return data;
};