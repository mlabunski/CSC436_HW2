import { useReducer, useEffect, useState } from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import appReducer from "./Reducers";
import Header from "./Header";
import { ThemeContext, StateContext } from "./Contexts";
import ChangeTheme from "./ChangeTheme";
import { useResource } from "react-request-hook";

function App({ title }) {
  const [state, dispatch] = useReducer(appReducer, { user: "", todos: [] });

  useEffect(() => {
    if (state.user) {
      document.title = `${state.user}’s Todos`;
    } else {
      document.title = "Todo App";
    }
  }, [state.user]);

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  /* useEffect(() => {
    fetch("/api/themes")
      .then((result) => result.json())
      .then((themes) => setTheme(themes));
  }, []);

  useEffect(() => {
    fetch("/api/todos")
      .then((result) => result.json())
      .then((todos) => dispatch({ type: "FETCH_TODOS", todos }));
  }, []); */

  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="Todo App" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          <TodoList />
          <br />
          {state.user && <CreateTodo />}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
