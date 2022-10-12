import { useReducer, useEffect } from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import appReducer from "./Reducers";

function App({ title }) {
  const [state, dispatch] = useReducer(appReducer, { user: "", todos: [] });

  useEffect(() => {
    if (state.user) {
      document.title = `${state.user}’s Todos`;
    } else {
      document.title = "Todo App";
    }
  }, [state.user]);

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
