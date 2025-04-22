import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/todos'

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch todos')
    return await res.json()
})

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
    const newTodo = { text, completed: false }
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
    })
    if (!res.ok) throw new Error('Failed to add todo')
    return await res.json()
})

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed }
    const res = await fetch(`${BASE_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo)
    })
    if (!res.ok) throw new Error('Failed to toggle todo')
    return await res.json()
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete todo')
    return id
})

const initialState = {
    items: [],
    isSuccess: false
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            // Add user to the state array
            state.isSuccess = true
        })
        builder.addCase(toggleTodo.fulfilled, (state, action) => {
            // Add user to the state array
            state.isSuccess = true
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            // Add user to the state array
            state.isSuccess = true
        })
    },
})

export const { resetSuccess } = todoSlice.actions

export default todoSlice.reducer