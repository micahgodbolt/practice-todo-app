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
    { id: 0, text: "Learn JavaScript", done: true },
    { id: 1, text: "Learn React", done: true },
    { id: 2, text: "Play around in JSFiddle" },
    { id: 3, text: "Build something awesome" },
  ]);
  const [nextId, setNextId] = React.useState(4)

  const addNewItem = (ev) => {
    const input = inputRef.current;
    if (input.value === '') return;
    setItems([...items, {id: nextId, text: input.value }]);
    setNextId(nextId + 1);
    input.value = '';
  }

  const removeItem = (indexToRemove) => {
    const newItems = items.filter((item, i) => item.id !== indexToRemove);
    setItems(newItems);
  }

  const toggleItem = (indexToToggle) => {
  	const newItems = items.map((item, i) => {
    	return (item.id !== indexToToggle) ? item : {...item, done: !item.done}
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
            key={item.id}
            id={item.id}
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

  const itemId = 'item' + props.id;

  return (
    <li className={props.done ? "done" : ""} style={style}>
      <span>{props.id +1 }</span>
      <button aria-label={`Delete todo ${props.text}`} onClick={handleRemove}>X</button>
      <label htmlFor={itemId} > {props.text}</label>
      <input id={ itemId } type="checkbox" checked={props.done ? true : false} onChange={handleSelect} />
    </li>
  );
}

