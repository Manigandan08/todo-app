import {
  Button,
  Checkbox,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function TodoApp() {
  const [Alltodos, setAlltodos] = useState([]);
  const [currentTask, setcurrentTask] = useState({});
  const [Todo, setTodo] = useState({
    id: Date.now(),
    task: "",
    isComplete: false,
    isEditing: false,
  });

  const AddTodo = () => {
    if (Todo.task.trim() !== "") {
      setAlltodos([...Alltodos, Todo]);
      setTodo({
        id: Date.now(),
        task: "",
        isComplete: false,
        isEditing: false,
      });
    }
  };

  const HandleChange = (e) => {
    {
      setTodo({ ...Todo, task: e.target.value });
    }
  };

  const HandleToggle = (id) => {
    setAlltodos(
      Alltodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const Handledelete = (id) => {
    setAlltodos(Alltodos.filter((todo) => todo.id !== id));
  };

  const deleteall = () => {
    setAlltodos([]);
  };

  const HandleEdit = (id) => {
    const beforeupdate = Alltodos.find((todo) => todo.id === id);
    setcurrentTask({ ...currentTask, [id]: beforeupdate.task });
    setAlltodos(
      Alltodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const HandleSave = (id) => {
    setAlltodos(
      Alltodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  };

  const HandleCancel = (id) => {
    setAlltodos(
      Alltodos.map((todo) =>
        todo.id === id
          ? { ...todo, task: currentTask[id], isEditing: false }
          : todo
      )
    );
  };

  console.log(currentTask);
  const HandleEditChange = (id, value) => {
    setAlltodos(
      Alltodos.map((todo) => (todo.id === id ? { ...todo, task: value } : todo))
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <TextField
          variant="outlined"
          size="small"
          style={{ marginRight: "10px" }}
          type="text"
          value={Todo.task}
          onChange={HandleChange}
        />
        <Button variant="contained" size="medium" onClick={AddTodo}>
          Add
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: "3px" }}
          onClick={deleteall}
        >
          Delete All
        </Button>

        <div>
          {" "}
          <h1>List of TODO's</h1>
          <List>
            {Alltodos.map((val) =>
              val.isEditing ? (
                <div key={val.id}>
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "10px" }}
                    type="text"
                    value={val.task}
                    onChange={(e) => HandleEditChange(val.id, e.target.value)}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => HandleSave(val.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => HandleCancel(val.id)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div key={val.id}>
                  <ListItem>
                    <Stack
                      direction="row"
                      marginBottom="5px"
                      textAlign="center"
                    >
                      <Checkbox
                        type="checkbox"
                        onChange={() => {
                          HandleToggle(val.id);
                        }}
                        checked={val.isComplete}
                      ></Checkbox>
                      <Typography
                        variant="h6"
                        style={
                          val.isComplete
                            ? {
                                textDecoration: "line-through",
                                marginTop: "3px",
                                marginRight: "5px",
                                marginLeft: "5px",
                              }
                            : {
                                marginTop: "3px",
                                marginRight: "5px",
                                marginLeft: "5px",
                              }
                        }
                      >
                        {val.task}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        style={{ marginRight: "5px" }}
                        onClick={() => HandleEdit(val.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => Handledelete(val.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </ListItem>
                </div>
              )
            )}
          </List>
        </div>
      </div>
    </div>
  );
}
