// A form component that will have a text input for the todo title
// and a button to submit the todo
// Later it will be used to edit the TodosCard as well
import type { TodoCardProps } from "./TodoApp.tsx";


export default function FormComponent({id, title}: TodoCardProps) {
    return (
        <div>
            <form action="">
                <label htmlFor="title">Todo Title</label>
                <input type="text" name="title" id="title" value={title}/>
            </form>
        </div>
    )
}