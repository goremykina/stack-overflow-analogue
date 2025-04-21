import { create } from "zustand";
import { User } from "./models/user.model.ts";

type Store = {
    user: User | null,
    setUser: (user: User | null) => void,
};

const useStore = create<Store>((set) => ({
    user: null,
    setUser: (user: User | null) => {
        set({ user });
    }
}));

export default useStore;