import { User } from "./user.model.ts";

export interface CreateCommentRequest {
    content: string,
    snippetId: string
}

export interface CommentResponse {
    id: string,
    content: string,
    user: User
}