import TodosContainer from "./TodosContainer.tsx";
import {useState} from "react";

export interface TodoCardProps {
    id: string;
    title: string;
    checked: boolean;
}

export interface TodosContainerProps {
    todosList: TodoCardProps[];
}

export default function TodoApp() {
    // States
    // A state to store the input change
    // When button is clicked the state will be stored as a todo entry
    // In other state that will save a list of todos
    const [todo, setTodo] = useState<TodoCardProps>({
        id: "",
        title: "",
        checked: false,
    });

    // Second state -> A state to store all the todo entries in one array
    const [todoList, setTodoList] = useState([]);

    return (
        <div>
            <TodosContainer todosList={todoList} />
        </div>
    )
}