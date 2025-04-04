import ky from "ky";

export const api = ky.create({
    prefixUrl: 'https://codelang.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    }
});
