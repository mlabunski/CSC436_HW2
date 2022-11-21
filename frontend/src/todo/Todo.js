import { useContext } from "react";
import { ThemeContext, StateContext } from "../Contexts";
import DeleteTodo from "./DeleteTodo";
import ToggleTodo from "./ToggleTodo";
import React from "react";

function Todo({
  title,
  description,
  author,
  dateCreated,
  _id,
  complete,
  dateCompleted,
}) {
  const { secondaryColor } = useContext(ThemeContext);
  const { state } = useContext(StateContext);
  const { user } = state;
  const username = user.username;

  return (
    <div>
      <br />
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{description}</div>
      <br />
      <i>
        Posted by <b>{username}</b> on {dateCreated}
      </i>
      <br />
      <div>
        <ToggleTodo
          id={_id}
          complete={complete}
          dateCompleted={dateCompleted}
        />
      </div>
      <br />
      <DeleteTodo id={_id} />
      <br />
      --------------------------------------------------------------------
      <br />
    </div>
  );
}

export default React.memo(Todo);
