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
  const [Todo, setTodo] = useState({
    id: Date.now(),
    task: "",
    isComplete: false,
  });

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

  const AddTodo = () => {
    if (Todo.task.trim() !== "") {
      setAlltodos([...Alltodos, Todo]);
      setTodo({
        id: Date.now(),
        task: "",
        isComplete: false,
      });
    }
  };

  const Handledelete = (id) => {
    setAlltodos(Alltodos.filter((todo) => todo.id !== id));
  };

  const deleteall = () => {
    setAlltodos([]);
  };

  console.log(Alltodos);

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
            {Alltodos.map((val) => (
              <div key={val.id}>
                <ListItem>
                  <Stack direction="row" marginBottom="5px" textAlign="center">
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
                      variant="outlined"
                      onClick={() => Handledelete(val.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
