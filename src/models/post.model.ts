export interface PostModel {
    id: string;
    code: string;
    language: string;
    marks: Mark[];
}

export interface Mark {
    id: string;
    type: string;
}

export interface Comment {
    id: string;
    content: string;
}

export interface User {
    id: string | number,
    username: string,
    role: string,
}
