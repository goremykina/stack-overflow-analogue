import { api } from './api';
import { PostModel } from "../models/post.model.ts";
import { QueryResponse } from "../models/response.model.ts";

export const fetchPosts = async () => {
    const response = await api.get<QueryResponse<PostModel[]>>('snippets');
    const json = await response.json();

    return json.data;
};