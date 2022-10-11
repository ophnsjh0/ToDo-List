import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist"

export enum Category {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface IToDo {
    text: string;
    category: Category
    id: number;
}

export const categoryState = atom<Category>({
    key: "category",
    default: Category.TO_DO
})

const { persistAtom } = recoilPersist({
    key: "id",
    storage: localStorage,
})


export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export const toDoSelector = selector({
    key: " toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState)
        const category = get(categoryState)
        return toDos.filter((toDo) => toDo.category === category);
    }
})

export interface INewCategory {
    newCategory: string;
}

export const newCategory = atom<INewCategory[]>({
    key: "newCategory",
    default: []
})