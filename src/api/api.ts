import ky from "ky";
import useStore from "../store.ts";
import toast from "react-hot-toast";

export const api = ky.create({
    prefixUrl: '/api',
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
            async (_request, _options, response) => {
                if (response.status !== 401 && response.status !== 409) {
                    return;
                }

                let message: string | undefined;

                try {
                    const body = await response.json<{ message?: string }>();
                    message = body.message;
                } catch {
                    return;
                }

                if (!message || message === 'No token provided!') {
                    return;
                }

                toast.error(message, {
                    position: 'bottom-right',
                });
            },
        ]
    }
});
