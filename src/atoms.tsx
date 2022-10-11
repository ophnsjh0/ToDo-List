import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist"


export let defaultCategories: string[] = ["TO_DO", "DOING", "DONE"];

export interface IToDo {
    text: string;
    category: string;
    id: number;
}

export const categoryState = atom<string>({
    key: "category",
    default: defaultCategories[0],
})

const { persistAtom } = recoilPersist({
    key: "id",
    storage: localStorage,
})

export const categoriesState = atom<string[]>({
	key: "categoriesState",
	default: JSON.parse(localStorage.getItem("categories") ?? JSON.stringify(defaultCategories)),
});

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

