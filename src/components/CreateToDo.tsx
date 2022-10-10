import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState, categoryState } from "../atoms";


interface IForm {
    toDo: string;
}

function CreateToDO() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>()
    const category = useRecoilValue(categoryState);
    const handleValid = ({ toDo }: IForm) => {
        setToDos(oldToDos => [{ text: toDo, category, id: Date.now() }, ...oldToDos])
        setValue('toDo', "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("toDo", {
                    required: "Please write a To Do",
                })}
                placeholder="Write a to do"
            />
            <button>Add</button>
        </form>
    );
};

export default CreateToDO;