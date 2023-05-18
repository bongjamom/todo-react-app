import { DeleteOutlined } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  InputBase,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

function Todo(props) {
  console.log(props);

  const [item, setItem] = useState(props.item);
  const deleteItem = props.deleteItem;
  const [readOnly, setReadOnly] = useState(true);
  const editItem = props.editItem;

  const turnOffReadOnly = () => {
    setReadOnly(false);
  };
  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    }
  };

  const deleteEventHandler = () => {
    deleteItem(item);
  };

  const editEventHandler = (e) => {
    // item.title = e.target.value;
    setItem({ ...item, title: e.target.value });
  };

  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    // setItem({ ...item, title: e.target.value });
    editItem(item);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: readOnly }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
