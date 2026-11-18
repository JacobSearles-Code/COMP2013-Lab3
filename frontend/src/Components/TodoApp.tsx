import TodosContainer from "./TodosContainer.tsx";
import {type ChangeEvent, type SubmitEvent, useEffect, useState} from "react";
import FormComponent from "./FormComponent.tsx";
import axios from "axios";

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

    // 0. Handle getting all stored to do task data from local server
    const handleGetData = async () => {
        try {
            await axios.get("http://localhost:3000/data").then((data) => {setTodoList(data.data)})
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetData()
    }, []);

    // 1. Handle the form input change to allow typing in the input
    const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo((prevTodo) => ({...prevTodo, [e.target.name]: e.target.value}))
    }

    // 2. Handle the onSubmit event to add the input to the TodoList
    const handleOnSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the page from refreshing when form submits
            if (todo.id === "") {
                try {
                    const newTodo: TodoCardProps = {
                        id: crypto.randomUUID(),
                        title: todo.title,
                        checked: false,
                    }
                    setTodoList((prevList) => [...prevList, newTodo]);
                    await axios.post("http://localhost:3000/data", newTodo)
                } catch (error) {
                    console.log(error);
                }

            } else { // Edit to do item, used for patching
                try {
                    await axios.patch(`http://localhost:3000/data/${todo.id}`, {...todo})
                    setTodoList((prevList) => prevList.map((entry) => entry.id === todo.id ? {
                        ...entry,
                        title: todo.title
                    } : {...entry}))
                } catch(error) {
                    console.log(error);
                }
            }
            setTodo({
                id: "",
                title: "",
                checked: false,
            });
    }

    // 3. Handle the Checkbox toggle when in TodoCard
    const handleTodoCheck = async (e: ChangeEvent<HTMLInputElement>, id: string) => {
        try {
            const selectedTodo = todoList.find((todo) => todo.id === id);
            await axios.patch(`http://localhost:3000/data/${id}`, {...selectedTodo, checked: e.target.checked});
            setTodoList((prevList) =>
                prevList.map((entry) =>
                    entry.id === id
                        ? {...entry, checked: e.target.checked}
                        : {...entry}));
        } catch(error) {
            console.log(error);
        }
        handleGetData();
    }

    // 4. Handle Deleting an item from the array
    const handleDeleteTodo = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/data/${id}`);
            setTodoList((prevList) => prevList.filter((entry) => entry.id !== id));
        } catch (error) {
            console.log(error);
        }
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