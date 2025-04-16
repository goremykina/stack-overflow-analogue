import { api } from './api';
import { CreatePost, MarkRequest, Post } from "../models/post.model.ts";
import { QueryResponse, ResponseWithData } from "../models/response.model.ts";
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

export const editPost = async (body: CreatePost, id: string) => {
    const response = await api.patch(`snippets/${id}`, { json: body });

    return response.json();
}

export const fetchPost = async (id: string) => {
    const response = await api.get<ResponseWithData<Post>>(`snippets/${id}`);
    const { data } = await response.json();

    return data;
}

export const addMarks = async (body: MarkRequest, id: string) => {
    const url = `snippets/${id}/mark`;
    await api.post(url, { json: body });
}