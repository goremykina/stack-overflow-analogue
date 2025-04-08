import { api } from './api';
import { ChangePasswordRequest, ChangePasswordResponse, User, UserStatisticsResponse } from "../models/user.model.ts";

export const getCurrentUser = async () => {
    const response = await api.get<User>('me');
    return response.json();
};

export const fetchStatistics = async (userId: string) => {
    const url = `users/${userId}/statistic`;
    const response = await api.get<UserStatisticsResponse>(url);
    const { data } = await response.json();

    return data;
};

export const changePassword = async (body: ChangePasswordRequest) => {
    const response = await api.patch<ChangePasswordResponse>('me/password', { json: body });
    const responseData = await response.json();

    return responseData.updatedCount > 0;
};