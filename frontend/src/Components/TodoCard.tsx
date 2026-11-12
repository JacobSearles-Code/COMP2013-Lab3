//This component will contain
// 1. Body for the title of the todo message
// 2. Button for deleting the todo entry
// 3. Button to edit this todo entry
// 4. Checkbox that will be used to check the entry if completed

import type {TodoCardFunctions} from "./TodoApp.tsx"

export default function TodoCard({id, checked, title, handleTodoCheck, handleDeleteTodo, handleEditTodo}: TodoCardFunctions) {

    return (
        <div>
            <input type="checkbox" name="checked" id="checked" checked={checked} onChange={(e) => handleTodoCheck(e, id)}/>
            <span>{title}</span>
            <button onClick={() => handleDeleteTodo(id) }>Delete</button>
            <button onClick={() => handleEditTodo(id)}>Edit</button>
        </div>
    )
}