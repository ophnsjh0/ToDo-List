import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState, Category } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: { name } } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, category: name as any, id }
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ]
        });
    };

    const deleteClick = () => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            return [
                ...oldToDos.slice(0, targetIndex),
                ...oldToDos.slice(targetIndex + 1),
            ]
        })
    }
    return (
        <li>
            <span>{text}</span>
            {category !== Category.DOING && (<button name={Category.DOING} onClick={onClick}>Doing</button>)}
            {category !== Category.TO_DO && (<button name={Category.TO_DO} onClick={onClick}>To Do</button>)}
            {category !== Category.DONE && (<button name={Category.DONE} onClick={onClick}>Done</button>)}
            <button onClick={deleteClick}>Delete</button>
        </li >
    );
}

export default ToDo;