import { useContext } from "react";
import { StateContext } from "../Contexts";
import Todo from "./Todo";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { todos, user } = state;
  return (
    <div>
      {todos.length === 0 && user && <h2>No todos found.</h2>}
      {todos.map((t, i) => (
        <Todo {...t} key={t._id} />
      ))}
    </div>
  );
}
