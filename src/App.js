import { useState, useReducer } from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import appReducer from "./Reducers";

function App() {
  //const [user, setUser] = useState("");
  //const [user, dispatchUser] = useReducer(userReducer, "");

  //const [todos, setTodos] = useState([]);
  //const [todos, dispatchTodos] = useReducer(todoReducer, []);

  const [state, dispatch] = useReducer(appReducer, { user: "", todos: [] });

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <TodoList todos={state.todos} />
      <br />
      {state.user && (
        <CreateTodo user={state.user} todos={state.todos} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
