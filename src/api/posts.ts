import { api } from './api';
import { CreatePost, Post } from "../models/post.model.ts";
import { QueryResponse } from "../models/response.model.ts";

export const fetchPosts = async (page: number = 1) => {
    const response = await api.get<QueryResponse<Post[]>>('snippets', { searchParams: { page } });
    const { data } = await response.json();

    return data;
};

export const fetchPostsUser = async (page: number = 1, id: string) => {
    const response = await api.get<QueryResponse<Post[]>>(`snippets/${id}`, { searchParams: { page } });
    const { data } = await response.json();

    return data;
};

export const createPost = async (body: CreatePost) => {
    await api.post('snippets', { json: body });
};