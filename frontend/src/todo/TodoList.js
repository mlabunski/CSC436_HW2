import { useContext } from "react";
import { StateContext } from "../Contexts";
import Todo from "./Todo";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { todos } = state;
  return (
    <div>
      {todos.map((t, i) => (
        <Todo {...t} key={t.id} />
      ))}
    </div>
  );
}
