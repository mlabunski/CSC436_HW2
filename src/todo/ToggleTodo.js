import { useContext } from "react";
import { StateContext } from "../Contexts";

export default function ToggleTodo({ id, complete }) {
  const { dispatch } = useContext(StateContext);

  var completeMsg = "";
  const date = new Date();

  if (complete) {
    completeMsg = " Completed on " + date.toDateString();
  } else {
    completeMsg = " Not completed";
  }

  return (
    <div>
      <input
        type="checkbox"
        onChange={() => {
          dispatch({
            type: "TOGGLE_TODO",
            id: id,
            complete: complete,
          });
        }}
      />
      {completeMsg}
    </div>
  );
}
