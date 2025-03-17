import { useState } from "react";

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
        <input type="text" value={Todo.task} onChange={HandleChange} />
        <button onClick={AddTodo}>Add</button>
        <button onClick={deleteall}>Delete All</button>

        <div>
          {" "}
          <h1>List of TODO's</h1>
          <ul>
            {Alltodos.map((val) => (
              <div key={val.id}>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => {
                      HandleToggle(val.id);
                    }}
                    checked={val.isComplete}
                  ></input>
                  <span
                    style={
                      val.isComplete ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {val.task}
                  </span>
                  <button onClick={() => Handledelete(val.id)}>Delete</button>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
