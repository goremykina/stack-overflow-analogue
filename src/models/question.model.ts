import { User } from "./user.model.ts";

export interface Question {
    id: string;
    title: string;
    description: string;
    answer: Answers[];
    user: User;
    attachedCode: string;
    isResolved: boolean;
}

export interface Answers {
    id: string;
    content: string;
    isCorrect: boolean;
}

export interface CreateQuestionResponse {
    title: string,
    description: string,
    attachedCode: string

}