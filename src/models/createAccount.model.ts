export interface CreateAccountRequest {
    username: string;
    password: string;
}

export interface CreateAccountResponse {
    data: CreateAccountResponseData;
}

export interface CreateAccountResponseData {
    username: string;
    role: string;
    id: string;
}