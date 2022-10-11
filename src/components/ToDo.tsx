import styled from "styled-components";
import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, categoriesState } from "../atoms";

const TodoList = styled.div`
    width: 80%;
	border-radius: 0.7rem;
	padding: 1rem;
    margin-top: 30px;
	margin-bottom: 1rem;
	color: black;
	background: whitesmoke;
    li {
        display : flex;
        flex-direction: column;
    }
    span {
        padding-left : 15px;
        display:flex;
        align-items: center;;
        background-color: beige;
        height : 25px;
        border-radius : 3px;
        box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
    }
`;

const Buttons = styled.div`
    display: flex;
	flex-direction: row;
	gap: 0.5rem;
	flex-wrap: wrap;
    margin-top: 15px;
	button {
		background-color: #5882FA;
		color: white;
		font-weight: 700;
		border: none;
		padding: 0.3rem 0.5rem;
		border-radius: 0.3rem;
		transition: background-color 0.3s;
		max-width: 10rem;
		overflow: hidden;
		height: 1.7rem;
		text-overflow: ellipsis;
	}
	button:last-child {
		background-color: #ffe0e6;
		color: #f3214f;
	}
	button[disabled] {
		opacity: 0.4;
	}
	button:not(:last-child):not(:disabled):hover {
		background-color: tomato;
`;

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue(categoriesState);
    const changeCategory = (selectedCategory: string) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, category: selectedCategory as any, id }
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
        <TodoList>
            <li>
                <span>{text}</span>
                <Buttons>
                    {Object.values(categories).map((availableCategory) => (
                        <button
                            disabled={availableCategory === category}
                            key={availableCategory}
                            onClick={() => changeCategory(availableCategory)}
                        >
                            {availableCategory}
                        </button>
                    ))}
                    <button onClick={deleteClick}>Delete</button>
                </Buttons>
            </li >
        </TodoList>
    );
}

export default ToDo;