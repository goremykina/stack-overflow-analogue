import ky from "ky";
import useStore from "../store.ts";

export const api = ky.create({
    prefixUrl: 'https://codelang.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
    hooks: {
        afterResponse: [
            (_request, _options, response) => {
                if (response.status === 401) {
                    useStore.setState({ user: null });
                }
            },
        ]
    }
});
