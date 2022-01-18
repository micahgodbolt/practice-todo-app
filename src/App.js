import * as React from "react";
import './App.css';

// Tasks:
// Make sure that you can’t add a blank todo
// Clear the input after adding a todo
// Investigate why deleting a todo is broken
// Investigate why the done todos aren’t blue
// Accessibility: Make the todo label associated with the checkbox 

// Stretch goal:
// Todos have a unique, constant ID number

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
    	return (i !== indexToToggle) ? item : {...item, done: !item.done}
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

const ListItem = (props) => {

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
      <span>{props.id +1 }</span>
      <button onClick={handleRemove}>X</button>
      <label> {props.text}</label>
      <input type="checkbox" checked={props.done ? true : false} onChange={handleSelect} />
    </li>
  );
}

