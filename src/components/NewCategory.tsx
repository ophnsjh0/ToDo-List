import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { newCategory } from "../atoms";


interface IForm {
    value: string;
}

function CreateToDO() {
    const [category, setCategory] = useRecoilState(newCategory);
    const { register, handleSubmit } = useForm<IForm>()
    const handleValid = ({ value }: any) => {
        console.log(value)
        console.log(category)
        setCategory((oldCategory: any) => {
            return {
                ...oldCategory, [value]: []
            };
        });
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("value", {
                    required: "Please write a To Category",
                })}
                placeholder="Write a to Category"
            />
            <button>Add</button>
        </form>
    );
};

export default CreateToDO;