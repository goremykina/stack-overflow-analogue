import { create } from "zustand";
import { User } from "./models/user.model.ts";

type Store = {
    user: User | null
};

const useStore = create<Store>(() => ({
    user: null,
}));

export default useStore;