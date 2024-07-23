import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync, fetchTodos } from "../redux/reducers/todoReducer";
import { Button, Text, TextInput, View, ActivityIndicator } from "react-native";

const TodoScreen = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const listTodo = useSelector(state => state.todos.listTodo);
    const status = useSelector(state => state.todos.status);
    const error = useSelector(state => state.todos.error);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = () => {
        if (title.trim()) {
            let duLieuThem = { title: title };
            dispatch(addTodoAsync(duLieuThem));
            setTitle(''); // Reset lại input sau khi thêm
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Nhập tên việc"
                value={title}
                onChangeText={setTitle}
                style={{ borderColor: 'black', borderWidth: 1, margin: 10, padding: 5 }}
            />
            <View style={{ width: 100, margin: 10 }}>
                <Button title="Thêm" onPress={handleAddTodo} />
            </View>

            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'failed' && <Text>Error: {error}</Text>}
            {status === 'succeeded' &&
                listTodo.map(row => (
                    <View
                        key={row.id}
                        style={{ padding: 10, margin: 10, backgroundColor: 'cyan' }}
                    >
                        <Text>{row.title} === {row.id}</Text>
                    </View>
                ))
            }
        </View>
    );
};

export default TodoScreen;
