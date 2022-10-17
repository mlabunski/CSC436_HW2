import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../Contexts";

export default function Todo({ title, description, author, dateCreated }) {
  const { secondaryColor } = useContext(ThemeContext);
  const [complete, setComplete] = useState(false);
  var completeMsg = "";
  const date = new Date();

  if (complete) {
    completeMsg = " Completed on " + date.toDateString();
  } else {
    completeMsg = " Not completed";
  }

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
      <input
        type="checkbox"
        onClick={() => {
          setComplete(!complete);
        }}
      />
      {completeMsg}
      <br />
      --------------------------------------------------------------------
      <br />
    </div>
  );
}
