import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        setTodos([]);
      }
    } else {
      setTodos([]);
    }
    inputRef.current?.focus();
  }, []);


  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Handle Add
  const handleAdd = () => {
    if (todo.length !== 0) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  // Edit the todo
  const handleEdit = (e, id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setTodos(todos.filter(item => item.id !== id));
      inputRef.current.focus();
    }
  };

  // Delete the todo
  const handleDelete = (e, id) => {
    if (window.confirm("Do you really want to delete this todo?")) {
      let newtodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newtodos);
    }
  };

  // HandleChange todo
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Handle isConpleted checkbox
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newtodos = [...todos];
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const toggleFinished = (e) => {
    setshowFinished(showFinished => !showFinished);
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto text-white my-7 p-3 lg:p-4  rounded-md lg:rounded-lg space-y-2 min-h-[85vh] *:selection:bg-[#212832] *:selection:text-white">
        <div className="addtodos space-y-2 ">
          <h2 className="text-sm lg:text-base pointer-events-none">Add a Todo</h2>
          <div className="flex gap-1">
            <input type="text" ref={inputRef} onChange={handleChange} onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }} value={todo} className="bg-transparent border p-2 px-4 w-full rounded-[6px] text-sm md:text-base selection:bg-[#FED36A] selection:text-black" placeholder="Learn Express.js"
            />
            <button onClick={handleAdd} className="btnstyles">Add</button>
          </div>
        </div>
        <div className="flex item-center gap-2">
          <input id="finished" type="checkbox" className="mt-2 w-4 cursor-pointer checked:accent-[#FED36A]" onChange={e => toggleFinished(e)} checked={showFinished} />
          <label htmlFor="finished" className="pt-2 selection:bg-[#212832] selection:text-white" >Show Finished</label>
        </div>
        <h2 className="text-sm lg:text-lg font-bold pointer-events-none">Your Todos</h2>
        {todos.length === 0 && <div>No Todos</div>}
        {todos.map((item) => {
          return (
            (showFinished || !item.isCompleted) && <div key={item.id} className="todo space-y-2 lg:flex items-center justify-between gap-1">
              <div className="flex gap-2 w-full">
                <input type="checkbox" name={item.id} id="checkbox" onChange={handleCheckbox} checked={item.isCompleted} className="mt-2 w-4 cursor-pointer checked:accent-[#FED36A]" />
                <div className={`text border-b p-2 w-full overflow-ellipsis pointer-events-none ${item.isCompleted ? "line-through decoration-2" : ""}`} >
                  {item.todo}
                </div>
              </div>
              <div className="buttons space-x-1 w-fit pl-1 flex justify-end">
                <button onClick={e => handleEdit(e, item.id)} className="py-2 px-4 rounded-md text-black bg-[#FED36A]"><FaEdit className="w-5 h-5" /></button>
                <button onClick={e => handleDelete(e, item.id)} className="py-2 px-4 rounded-md text-black bg-[#FED36A]"><RiDeleteBin5Fill className="w-5 h-5" /></button>
              </div>
            </div>);
        })}
      </main>
    </>
  );
}

export default App;
