import { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";

export default function ToggleTodo({ id, complete, dateCompleted }) {
  const { state, dispatch } = useContext(StateContext);

  const [todo, toggleTodo] = useResource(({ id, complete, dateCompleted }) => ({
    url: "/todo/" + id,
    method: "patch",
    headers: { Authorization: `${state.user.access_token}` },
    data: { id, complete, dateCompleted },
  }));

  useEffect(() => {
    if (todo && todo.isLoading === false && todo.data) {
      console.log("complete: ", todo.data.toggled.complete);
      console.log("date complete: ", todo.data.toggled.dateCompleted);
      dispatch({
        type: "TOGGLE_TODO",
        id: todo.data.toggled._id,
        complete: todo.data.toggled.complete,
        dateCompleted: todo.data.toggled.dateCompleted,
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
