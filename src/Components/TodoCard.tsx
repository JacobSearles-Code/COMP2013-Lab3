//This component will contain
// 1. Body for the title of the todo message
// 2. Button for deleting the todo entry
// 3. Button to edit this todo entry
// 4. Checkbox that will be used to check the entry if completed

import type {TodoCardProps} from "./TodoApp.tsx"

export default function TodoCard({checked, title}: TodoCardProps) {

    return (
        <div>
            <input type="checkbox" name="checked" id="checked" checked={checked}/>
            <span>{title}</span>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    )
}