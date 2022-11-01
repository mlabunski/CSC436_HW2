function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODOS":
      return action.todos;

    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        id: action.id,
        complete: action.complete,
      };
      return [...state, newTodo];
    case "DELETE_TODO":
      return [...state].filter((x) => x.id !== action.id);
    case "TOGGLE_TODO":
      const updatedTodos = state.map((x) => {
        if (x.id === action.id) {
          return { ...x, complete: !action.complete };
        }
        return x;
      });
      return updatedTodos;
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
