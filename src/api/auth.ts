import { CreateAccountRequest, CreateAccountResponse } from "../models/createAccount.model.ts";
import { api } from "./api.ts";
import { LoginRequest } from "../models/login.model.ts";

export const login = async (data: LoginRequest) => {
    await api.post('auth/login', { json: data });
};

export const createAccount = async (data: CreateAccountRequest) => {
    const response = await api.post<CreateAccountResponse>('register', { json: data });
    const responseJson = await response.json();

    return responseJson.data;
};