import { useContext } from "react";
import { ThemeContext } from "../Contexts";
import DeleteTodo from "./DeleteTodo";
import ToggleTodo from "./ToggleTodo";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  id,
  complete,
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
      <ToggleTodo id={id} complete={complete} />
      <br />
      <DeleteTodo id={id} />
      <br />
      --------------------------------------------------------------------
      <br />
    </div>
  );
}
