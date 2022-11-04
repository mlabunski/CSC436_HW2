import { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";

export default function ToggleTodo({ id, complete, dateCompleted }) {
  const { dispatch } = useContext(StateContext);

  const [todo, toggleTodo] = useResource(({ id, complete, dateCompleted }) => ({
    url: "/todos/" + id,
    method: "patch",
    data: { id, complete, dateCompleted },
  }));

  useEffect(() => {
    if (todo && todo.isLoading === false && todo.data) {
      dispatch({
        type: "TOGGLE_TODO",
        id: todo.data.id,
        complete: todo.data.complete,
        dateCompleted: todo.data.dateCompleted,
      });
    }
  }, [todo]);

  const todaysDate = new Date().toDateString();

  return (
    <div>
      <input
        type="checkbox"
        checked={complete}
        onChange={() => {
          toggleTodo({
            id: id,
            complete: !complete,
            dateCompleted: todaysDate,
          });
        }}
      />
      {complete && (
        <span style={{ color: "green" }}>Completed on {dateCompleted}</span>
      )}
    </div>
  );
}
