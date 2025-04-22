import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../redux/todo/todo.slice'

export default function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todo.items)
    const loading = useSelector(state => state.todo.loading)
    const [text, setText] = useState("")

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addTodo(text))
            setText("")
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">📝 Todo List</h2>

            <div className="flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a task..."
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                    Add
                </button>
            </div>

            <ul className="divide-y divide-gray-200">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center justify-between py-2 group">
                        <span
                            className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                                } transition`}
                        >
                            {todo.text}
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => dispatch(toggleTodo(todo))}
                                className={`text-sm px-2 py-1 rounded-md border ${todo.completed
                                        ? 'text-yellow-600 border-yellow-400 hover:bg-yellow-100'
                                        : 'text-green-600 border-green-400 hover:bg-green-100'
                                    } transition`}
                            >
                                {todo.completed ? '↩️ Hoàn tác' : '✔️ Hoàn thành'}
                            </button>

                            <button
                                onClick={() => dispatch(deleteTodo(todo.id))}
                                className="text-red-500 font-bold ml-2 opacity-0 group-hover:opacity-100 transition"
                            >
                                ❌
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )
}
