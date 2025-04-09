import { api } from './api';
import {
    ChangeNameRequest,
    ChangePasswordRequest,
    UpdatePasswordResponseData,
    User,
    UserStatisticsResponse, UserWithPassword
} from "../models/user.model.ts";
import { ResponseWithData, ResponseWithMessage } from "../models/response.model.ts";

export const getCurrentUser = async () => {
    const response = await api.get<ResponseWithData<User>>('me');
    const { data } = await response.json();

    return data;
};

export const fetchStatistics = async (userId: string) => {
    const url = `users/${userId}/statistic`;
    const response = await api.get<UserStatisticsResponse>(url);
    const { data } = await response.json();

    return data;
};

export const changePassword = async (body: ChangePasswordRequest) => {
    const response = await api.patch<ResponseWithMessage<UpdatePasswordResponseData>>('me/password', { json: body });
    await response.json();
};

export const changeName = async (body: ChangeNameRequest) => {
    const response = await api.patch<ResponseWithMessage<UserWithPassword>>('me', { json: body });
    const { data } = await response.json();

    return data;
};