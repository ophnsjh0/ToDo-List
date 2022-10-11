import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState, categoryState } from "../atoms";

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    input {
        border-radius: 0;
        padding: 10px 30px;
        width: 50%;
        border: none;
        font-size: 14px;
        border-radius : 10px;
    }
    button {
        font-size: 14px;
        height : 35px;
        border-radius : 5px;
    }
`;

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
            <InputContainer>
                <input
                    {...register("toDo", {
                        required: "Please write a To Do",
                    })}
                    placeholder="Write a to do"
                />
                <button>ADD</button>
            </InputContainer>
        </form>
    );
};

export default CreateToDO;