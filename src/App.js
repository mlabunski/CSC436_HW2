import { useState } from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";

function App() {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      <TodoList todos={todos} />
      <br />
      {user && <CreateTodo user={user} todos={todos} setTodos={setTodos} />}
    </div>
  );
}

export default App;
