import { useContext } from "react";
import { StateContext } from "../Contexts";
import React from "react";

import Login from "./Login";
import Register from "./Register";

const Logout = React.lazy(() => import("./Logout"));

export default function UserBar() {
  const { state } = useContext(StateContext);
  if (state.user) {
    return <Logout />;
  } else {
    return (
      <>
        <Login />
        <Register />
      </>
    );
  }
}
