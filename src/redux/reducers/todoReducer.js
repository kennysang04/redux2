import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_URL = 'https://jsonplaceholder.typicode.com/todos';


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodo', async (todo) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        listTodo: [],
        status: 'idle', // hoặc 'loading', 'succeeded', 'failed'
        error: null,
    },
    reducers: {
        // Có thể thêm các reducers đồng bộ tại đây
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listTodo = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.listTodo.push(action.payload);
            });
    },
});

export default todoSlice.reducer;
