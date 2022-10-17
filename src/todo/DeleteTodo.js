import { useState, useContext } from "react";
import { v4 } from "uuid";
import { StateContext } from "../Contexts";

export default function DeleteTodo({ id }) {
  const { state, dispatch } = useContext(StateContext);
  const { todos } = state;

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
