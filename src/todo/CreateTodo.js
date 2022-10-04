import { useState } from "react";

export default function CreateTodo({ user, todos, setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const date = new Date();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTodo = {
          title,
          description,
          author: user,
          dateCreated: date.toDateString(),
        };
        setTodos([...todos, newTodo]);
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
