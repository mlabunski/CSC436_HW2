import { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { ThemeContext, StateContext } from "../Contexts";
import DeleteTodo from "./DeleteTodo";
import ToggleTodo from "./ToggleTodo";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  id,
  complete,
  dateCompleted,
}) {
  const { secondaryColor } = useContext(ThemeContext);

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
