import "./App.css";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import { call } from "./service/ApiService";

function App() {
  // const [item, setItem] = useState({
  //   id: "0",
  //   title: "Hello World 1",
  //   done: true,
  // });
  const [items, setItems] = useState([
    { id: "0", title: "Hello World0", done: true },
    { id: "1", title: "Hello World1", done: false },
  ]);
  let str = [];
  for (let i = 0; i < items.length; i++) {
    str.push(<Todo item={items[i]} />);
  }

  const addItem = (item) => {
    // item.id = "ID-" + items.length;
    // item.done = false;
    // setItems([...items, item]);
    // console.log(items);
    call("/todo", "POST", item).then((resp) => setItems(resp.data));
  };

  const deleteItem = (item) => {
    // setItems([...items.filter((e) => e.id !== item.id)]);
    call("/todo", "DELETE", item).then((resp) => setItems(resp.data));
  };

  const editItem = (item) => {
    // setItems([...items]);
    call("/todo", "PUT", item).then((resp) => setItems(resp.data));
  };

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    // fetch("http://localhost:8080/todo", requestOptions)
    //   .then((resp) => resp.json())
    //   .then(
    //     (resp) => {
    //       setItems(resp.data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    call("/todo", "GET", null).then((resp) => setItems(resp.data));
  }, []);

  let todoItems =
    items.length > 0 &&
    items.map((item) => (
      <Paper style={{ margin: 16 }}>
        <List>
          <Todo
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        </List>
      </Paper>
    ));
  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
