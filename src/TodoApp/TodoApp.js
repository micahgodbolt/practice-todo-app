
import * as React from "react";
import { ListItem } from './ListItem';

export const TodoApp = (props) => {
  const inputRef = React.useRef(null);
  const [items, setItems] = React.useState([
    { text: "Learn JavaScript", done: true },
    { text: "Learn React", done: true },
    { text: "Play around in JSFiddle" },
    { text: "Build something awesome" },
  ]);

  const addNewItem = (ev) => {
    const input = inputRef.current;
    setItems([...items, { text: input.value }]);
  }

  const removeItem = (indexToRemove) => {
    const newItems = items.filter((item, i) => i === indexToRemove);
    setItems(newItems);
  }

  const toggleItem = (indexToToggle) => {
    const newItems = items.map((item, i) => {
      return (i !== indexToToggle) ? item : { ...item, done: !item.done }
    })
    setItems(newItems);
  }

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
  )
}