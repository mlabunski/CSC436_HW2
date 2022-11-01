import { useContext } from "react";
import { StateContext } from "../Contexts";

export default function DeleteTodo({ id }) {
  const { dispatch } = useContext(StateContext);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
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
