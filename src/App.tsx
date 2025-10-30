
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store"; 
import TodoList from "./app/features/todos/TodoList";


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>My Todo List</h1>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
