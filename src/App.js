import "./App.css";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import { call } from "./service/ApiService";
import Navigation from "./Navigation";

function App() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([
    { id: "0", title: "Hello World0", done: true },
    { id: "1", title: "Hello World1", done: false },
  ]);
  let str = [];
  for (let i = 0; i < items.length; i++) {
    str.push(<Todo item={items[i]} />);
  }

  const addItem = (item) => {
    call("/todo", "POST", item).then((resp) => setItems(resp.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((resp) => setItems(resp.data));
  };

  const editItem = (item) => {
    call("/todo", "PUT", item).then((resp) => setItems(resp.data));
  };

  // const requestOptions = {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  // };

  useEffect(() => {
    call("/todo", "GET", null).then((resp) => setItems(resp.data));
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        ))}
      </List>
    </Paper>
  );

  return (
    <div className="App">
      {loading ? (
        <h1> 로딩 중..</h1>
      ) : (
        <div>
          <Navigation />
          <Container maxWidth="md">
            <AddTodo addItem={addItem} />
            {todoItems}
          </Container>
        </div>
      )}
    </div>
  );
}

export default App;
