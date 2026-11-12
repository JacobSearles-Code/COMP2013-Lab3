// This components will have a Todo list as a prop
// Then we will map it into several TodoCards

import type {TodosContainerProps} from "./TodoApp.tsx";
import TodoCard from "./TodoCard.tsx";

export default function TodosContainer({ todosList, handleTodoCheck, handleDeleteTodo, handleEditTodo }: TodosContainerProps) {
    return (
        <div>
            {todosList.length > 0 || "Todo List is Empty"}
            {todosList.map((todo) =>
                    <TodoCard key={todo.id} {...todo} handleTodoCheck={handleTodoCheck} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
                )}
        </div>
    )
}