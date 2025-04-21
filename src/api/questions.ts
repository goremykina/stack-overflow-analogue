import { api } from "./api.ts";
import { QueryResponse } from "../models/response.model.ts";
import { CreateQuestionResponse, Question } from "../models/question.model.ts";

export const getAllQuestions = async (page: number = 1) => {
    const response = await api.get<QueryResponse<Question[]>>('questions', { searchParams: { page } });
    const { data } = await response.json();

    return data;
};

export const createQuestion = async (body: CreateQuestionResponse) => {
    await api.post('questions', { json: body });
};