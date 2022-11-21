import { useContext } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";

export default function DeleteTodo({ id }) {
  const { state, dispatch } = useContext(StateContext);

  const [todo, deleteTodo] = useResource((id) => ({
    url: "/todo/" + id,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
    data: { id },
  }));

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        deleteTodo(id);
        dispatch({
          type: "DELETE_TODO",
          id: id,
        });
      }}
    >
      Delete
    </button>
  );
}
