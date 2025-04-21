export const routes = Object.freeze({
    home: '/',
    login: '/login',
    signUp: '/signup',
    account: '/account',
    createPost: '/create-post',
    editPost: '/edit-post/:postId',
    users: '/users',
    questions: '/questions',
    createQuestion: '/create-question',
    userPosts: '/my-posts',
    post: '/post/:postId',
} as const);