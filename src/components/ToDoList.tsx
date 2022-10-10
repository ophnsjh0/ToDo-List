import { useRecoilState, useRecoilValue } from "recoil";
import { toDoSelector, categoryState, Category } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector)
    const [category, setCategory] = useRecoilState(categoryState)
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const { currentTarget: { value } } = event
        setCategory(value as any);
    }
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Category.TO_DO}>TO_DO</option>
                <option value={Category.DOING}>DOING</option>
                <option value={Category.DONE}>DONE</option>
            </select>
            <CreateToDo />
            {toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
        </div >
    );
};


export default ToDoList;

