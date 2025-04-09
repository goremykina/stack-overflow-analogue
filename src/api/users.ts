import { api } from './api';
import {
    ChangeNamedRequest,
    ChangePasswordRequest,
    UpdateUserResponse,
    User,
    UserStatisticsResponse
} from "../models/user.model.ts";
import { ResponseWithData } from "../models/response.model.ts";

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
    const response = await api.patch<UpdateUserResponse>('me/password', { json: body });
    const responseData = await response.json();

    return responseData.updatedCount > 0;
};

export const changeName = async (body: ChangeNamedRequest) => {
    const response = await api.patch<UpdateUserResponse>('me', { json: body });
    const responseData = await response.json();

    return responseData.updatedCount > 0;
};