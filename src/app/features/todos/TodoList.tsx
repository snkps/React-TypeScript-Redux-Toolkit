import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addTodo, toggleTodo, setFilter } from "./todosSlice";

const TodoList: React.FC = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state: RootState) => state.todos.items);
  const filter = useSelector((state: RootState) => state.todos.filter);
  const dispatch: AppDispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleFilter = (filterType: "all" | "active" | "completed") => {
    dispatch(setFilter(filterType));
  };

  // Фільтруємо туду по стану
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h2>My Todo List</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: 8, borderRadius: 5, border: "1px solid #ff4d8b" }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff4d8b",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => handleFilter("all")} style={{ marginRight: 8 }}>All</button>
        <button onClick={() => handleFilter("active")} style={{ marginRight: 8 }}>Active</button>
        <button onClick={() => handleFilter("completed")}>Completed</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              padding: 8,
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
