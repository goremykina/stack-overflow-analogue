import { api } from "./api.ts";
import { CommentResponse, CreateCommentRequest } from "../models/comments.model.ts";
import { ResponseWithData } from "../models/response.model.ts";

export const addComment = async (body: CreateCommentRequest) => {
    const response = await api.post<ResponseWithData<CommentResponse>>('comments', { json: body });
    const { data } = await response.json();

    return data;
}