import { CreateAccountRequest, CreateAccountResponse } from "../models/createAccount.model.ts";
import { api } from "./api.ts";

export const createAccount = async (data: CreateAccountRequest) => {
    const response = await api.post<CreateAccountResponse>('register', { json: data });
    const responseJson = await response.json();

    return responseJson.data;
};