import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoSelector, categoryState, categoriesState } from "../atoms";
import { useEffect } from "react";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
display :flex;
`;
const Categories = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    height :100px;
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width : 80px;
        height : 30px;
        background-color : #5882FA;
        color : white;
        border-radius: 8px;
        font-size:15px;
        cursor: pointer; 
        &:hover {
            display: flex;
            justify-content: center;
            align-items: center;
            width : 80px;
            height : 30px;
            background-color : #E0E6F8;
            color : #5882FA;
            border-radius: 8px;
            font-size:15px;
        }
         
    }
    button[disabled] {
        background-color : #E0E6F8;
        font-weight: 700;
        color: #5882FA;
    }
`;
const NewCategories = styled.div`
display: flex;
    justify-content:space-around;
    align-items: center;
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width : 50px;
        height : 30px;
        color : white;
        border-radius: 8px;
        font-size:17px;
        cursor: pointer;
        &:hover {
            display: flex;
            justify-content: center;
            align-items: center;
            width : 50px;
            height : 30px;
            background-color : #E0E6F8;
            color : #5882FA;
            border-radius: 8px;
            font-size:17px; 
        }   
    }
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector)
    const [category, setCategory] = useRecoilState(categoryState)
    const [categories, setCategories] = useRecoilState(categoriesState);
    const onClick = ( category : string ) => {
        setCategory(category);
    }
    // console.log(toDos);
    const addCategory = () => {
        const newCategory = prompt("카테고리 이름을 입력하세요", ""); 
        if (newCategory) {
            if (categories.includes(newCategory)) {
                alert("같은 이름의 카테고리가 있어 추가할 수 없습니다.");
                return;
            }    
            setCategories([...categories, newCategory]);
            setCategory(newCategory);
        }
    };

    useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <Container>
                <Categories>
                    {categories.map((availableCategory) => (
                        <div key={availableCategory}>
                            <button
                                onClick={() => onClick(availableCategory)}
                                disabled={availableCategory === category}
                            >
                                {availableCategory}
                            </button>
                        </div>
                    ))}
                </Categories>
                <NewCategories>
                    <button onClick={addCategory}>
                        📄
					</button>
                </NewCategories>
            </Container>
            <CreateToDo />
            {toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
        </div >
    );
};


export default ToDoList;

