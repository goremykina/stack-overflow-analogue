import { CreateAccountRequest, CreateAccountResponse } from "../models/createAccount.model.ts";
import { api } from "./api.ts";
import { LoginRequest } from "../models/login.model.ts";
import { User } from "../models/user.model.ts";
import { ResponseWithMessage } from "../models/response.model.ts";
import useStore from "../store.ts";

export const login = async (body: LoginRequest) => {
    const response = await api.post<ResponseWithMessage<User>>('auth/login', { json: body });
    const { data } = await response.json();

    useStore.setState({ user: data });
};

export const createAccount = async (body: CreateAccountRequest) => {
    const response = await api.post<CreateAccountResponse>('register', { json: body });
    const { data } = await response.json();

    return data;
};

export const logout = async () => {
    try {
        await api.post('auth/logout');
    } finally {
        useStore.setState({ user: null });
    }
};