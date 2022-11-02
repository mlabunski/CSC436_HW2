import { useState, useContext } from "react";
import { v4 } from "uuid";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const date = new Date();

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ id, title, description, author, complete, dateCreated }) => ({
      url: "/todos",
      method: "post",
      data: { id, title, description, author, complete, dateCreated },
    })
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({
          id: v4(),
          title,
          description,
          author: user,
          complete: false,
          dateCreated: date.toDateString(),
        });
        dispatch({
          type: "CREATE_TODO",
          id: v4(),
          title,
          description,
          author: user,
          complete: false,
          dateCreated: date.toDateString(),
        });
      }}
    >
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input type="submit" value="Create" disabled={title.length === 0} />
    </form>
  );
}
