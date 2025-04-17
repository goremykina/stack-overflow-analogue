import { api } from "./api.ts";
import { CommentResponse, Comments } from "../models/comments.model.ts";

export const addComment = async (body: Comments) => {
    const response = await api.post<CommentResponse>('comments', { json: body });
    return response.json();
}