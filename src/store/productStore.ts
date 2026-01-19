import { create  } from "zustand";
import { devtools } from "zustand/middleware";

interface IProductStore {
    sortValue: string;
    currentPage: number;
    limit: number;
    skip: number;
    setCurrentPage: (val: number) => void;
    setSkip: (val: number) => void;
    setSortValue: (val: string) => void;
}

export const productStore = create<IProductStore>()(devtools((set) => ({
    sortValue: '',
    currentPage: 1,
    limit: 12,
    skip: 0,
    setCurrentPage: (val) => set({ currentPage: val }),
    setSkip: (val) => set({ skip: val}),
    setSortValue: (val) => set({ sortValue: val })
})))