import { useState, useContext, useEffect } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const date = new Date();

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ title, description, author, complete, dateCreated, dateCompleted }) => ({
      url: "/todos",
      method: "post",
      data: {
        title,
        description,
        author,
        complete,
        dateCreated,
        dateCompleted,
      },
    })
  );

  useEffect(() => {
    if (todo && todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        id: todo.data.id,
        title: todo.data.title,
        description: todo.data.description,
        author: todo.data.author,
        dateCreated: todo.data.dateCreated,
        complete: todo.data.complete,
        dateCompleted: todo.data.dateCompleted,
      });
    }
  }, [todo]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({
          title,
          description,
          author: user,
          complete: false,
          dateCreated: date.toDateString(),
          dateCompleted: "Not complete",
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
