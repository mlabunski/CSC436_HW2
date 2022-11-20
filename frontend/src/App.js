import { useReducer, useEffect, useState } from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import appReducer from "./Reducers";
import Header from "./Header";
import { ThemeContext, StateContext } from "./Contexts";
import ChangeTheme from "./ChangeTheme";
import { useResource } from "react-request-hook";
import React from "react";

function App() {
  const initialTodos = [];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodos,
  });

  useEffect(() => {
    if (state.user) {
      document.title = `${state.user.username}’s Todos`;
    } else {
      document.title = "Todo App";
    }
  }, [state.user]);

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  useEffect(() => {
    if (state.user) {
      getTodos();
    }
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.todos });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="Todo App" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>
          {state.user && <TodoList />}
          <br />
          {state.user && <CreateTodo />}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
