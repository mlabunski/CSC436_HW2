import { useContext } from "react";
import { ThemeContext } from "../Contexts";
import DeleteTodo from "./DeleteTodo";
import ToggleTodo from "./ToggleTodo";
import React from "react";

function Todo({
  title,
  description,
  author,
  dateCreated,
  id,
  complete,
  dateCompleted,
}) {
  const { secondaryColor } = useContext(ThemeContext);
  console.log("post rendered");

  return (
    <div>
      <br />
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{description}</div>
      <br />
      <i>
        Posted by <b>{author}</b> on {dateCreated}
      </i>
      <br />
      <div>
        <ToggleTodo id={id} complete={complete} dateCompleted={dateCompleted} />
      </div>
      <br />
      <DeleteTodo id={id} />
      <br />
      --------------------------------------------------------------------
      <br />
    </div>
  );
}

export default React.memo(Todo);
