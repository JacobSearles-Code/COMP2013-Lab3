import TodosContainer from "./TodosContainer.tsx";
import {type ChangeEvent, type SubmitEvent, useState} from "react";
import FormComponent from "./FormComponent.tsx";

export interface TodoCardProps {
    id: string;
    title: string;
    checked: boolean;
}

export interface TodoCardFunctions extends TodoCardProps {
    handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleDeleteTodo: (id: string) => void;
    handleEditTodo: (id: string) => void;
}

export interface TodosContainerProps {
    todosList: TodoCardProps[];
    handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleDeleteTodo: (id: string) => void;
    handleEditTodo: (id: string) => void;

}

export interface FormComponentProps extends TodoCardProps {
    handleFormOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
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
    const [todoList, setTodoList] = useState<TodoCardProps[]>([]);

    // Handlers
    // 1. Handle the form input change to allow typing in the input
    const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo((prevTodo) => ({...prevTodo, [e.target.name]: e.target.value}))
    }

    // 2. Handle the onSubmit event to add the input to the TodoList
    const handleOnSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the page from refreshing when form submits
        if (todo.id === "") {
            setTodoList((prevList) => [...prevList, {
                id: crypto.randomUUID(),
                title: todo.title,
                checked: false,
            }]);
        } else {
            setTodoList((prevList) => prevList.map((entry) => entry.id === todo.id ? {...entry, title: todo.title} : {...entry}))
        }
        setTodo({
            id: "",
            title: "",
            checked: false,
        });
    }

    // 3. Handle the Checkbox toggle when in TodoCard
    const handleTodoCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        setTodoList((prevList) => prevList.map((entry) => entry.id === id ? {...entry, checked:e.target.checked} : {...entry}));
    }

    // 4. Handle Deleting an item from the array
    const handleDeleteTodo = (id: string) => {
        setTodoList((prevList) => prevList.filter((entry) => entry.id !== id));
    }

    // 5. Handle editing the title of the Todo entry
    const handleEditTodo = (id: string) => {
        const todoEntry = todoList.find((entry) => entry.id === id) || {title: "", id: "", checked: false,};
        setTodo({...todoEntry});
    }

    // Main return
    return (
        <div>
            <h1>Todo List App</h1>
            <FormComponent {...todo} handleFormOnChange={handleFormOnChange} handleOnSubmit={handleOnSubmit}/>
            <TodosContainer todosList={todoList} handleTodoCheck={handleTodoCheck} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
        </div>
    )
}