import * as React from "react";
import "./TodoApp.css";
import { defaultData } from "./defaultData";

export const TodoApp = (props) => {
  const inputRef = React.useRef(null);
  const [items, setItems] = React.useState(defaultData);

  const addNewItem = () => {
    const input = inputRef.current;
    setItems([...items, { text: input.value }]);
  };

  const removeItem = (indexToRemove) => {
    const newItems = items.filter((item, i) => {
      const itemIndex = i;
      if (itemIndex === indexToRemove) {
        return true;
      } else {
        return false;
      };
    });
    setItems(newItems);
  };

  const toggleItem = (indexToToggle) => {
    const newItems = items.map((item, i) => {
      return i !== indexToToggle ? item : { ...item, done: !item.done };
    });
    setItems(newItems);
  };

  return (
    <div>
      <input ref={inputRef} placeholder={"Insert Text"} />
      <button onClick={addNewItem}>Add Item</button>
      {items.length === 0 && <h2>You have an empty list! Add something</h2>}
      <ol>
        {items.map((item, i) => (
          <ListItem
            key={i}
            id={i}
            text={item.text}
            done={item.done}
            removeItem={removeItem}
            toggleItem={toggleItem}
          />
        ))}
      </ol>
    </div>
  );
};

const ListItem = (props) => {
  const handleSelect = () => props.toggleItem(props.id);

  return (
    <li className={props.done ? "item" : "item done"}>
      <span>{props.id + 1}</span>
      <button
        type="button"
        aria-label={`Delete to do ${props.text}`}
        click={props.removeItem}>
        X
      </button>
      <label> {props.text}</label>
      <input
        type="checkbox"
        checked={props.done ? true : false}
        onChange={handleSelect}
      />
    </li>
  );
};
