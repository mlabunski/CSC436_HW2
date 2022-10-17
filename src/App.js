import { useReducer, useEffect, useState } from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import appReducer from "./Reducers";
import Header from "./Header";
import { ThemeContext, StateContext } from "./Contexts";
import ChangeTheme from "./ChangeTheme";

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
