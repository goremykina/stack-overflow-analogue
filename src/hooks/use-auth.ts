import useStore from "../store.ts";

type UseAuthResult = {
    isAuthorized: boolean;
}

const useAuth = () : UseAuthResult => {
    const user = useStore(store => store.user);
    return {
        isAuthorized: !!user,
    };
};

export default useAuth;