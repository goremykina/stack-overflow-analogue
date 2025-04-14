import { api } from './api';
import { CreatePost, Post } from "../models/post.model.ts";
import { QueryResponse } from "../models/response.model.ts";
import { SearchParamsOption } from "ky";

export const fetchPosts = async (page: number = 1, userId: string | null = null) => {
    const searchParams:  SearchParamsOption = {
        page
    };

    if (userId) {
        searchParams.userId = userId;
    }

    const response = await api.get<QueryResponse<Post[]>>('snippets', { searchParams });
    const { data } = await response.json();

    return data;
};

export const createPost = async (body: CreatePost) => {
    await api.post('snippets', { json: body });
};