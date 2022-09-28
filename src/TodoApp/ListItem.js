import * as React from "react";

export const ListItem = (props) => {

  const handleRemove = (ev) => {
    props.removeItem(props.id);
  }

  const handleSelect = (ev) => {
    props.toggleItem(props.id);
  }

  const style = {
    color: '#333',
    marginTop: 6,
    marginBottom: 6
  };

  return (
    <li className={props.done ? "done" : ""} style={style}>
      <span>{props.id + 1}</span>
      <button type="" onClick={handleRemove}>X</button>
      <label> {props.text}</label>
      <input type="checkbox" checked={props.done ? true : false} onChange={handleSelect} />
    </li>
  );
}
