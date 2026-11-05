// This components will have a Todo list as a prop
// Then we will map it into several TodoCards

import type {TodosContainerProps} from "./TodoApp.tsx";
import TodoCard from "./TodoCard.tsx";

export default function TodosContainer({ todosList }: TodosContainerProps) {
    return (
        <div>
            {todosList.map((todo) =>
                    <TodoCard id={todo.id} {...todo} />
                )}
        </div>
    )
}