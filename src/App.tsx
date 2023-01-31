import { useEffect, useState } from "react";
import { ITask } from "./Interfaces";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [deadLine, setDeadLine] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const addTask = (): void => {
    const newTask = { id: Date.now(), taskName: todo, deadLine: deadLine };
    setTodoList([...todoList, newTask]);
    localStorage.setItem("todos", JSON.stringify([...todoList, newTask]));
    setTodo("");
    setDeadLine("");
  };

  const handleDelete = (id: number): void => {
    setTodoList(todoList.filter((item) => item.id !== id));
    const updateTodos = todoList.filter((task) => task.id !== id);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div className=" container max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-center my-10 text-white">
        Todo App
      </h1>
      <div className="flex space-x-3">
        <input
          value={todo}
          name="task"
          type="text"
          placeholder="Task"
          onChange={(e) => setTodo(e.target.value)}
          className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
        />
        <input
          value={deadLine}
          name="deadLine"
          onChange={(e) => setDeadLine(e.target.value)}
          type="text"
          placeholder="Deadline in Days"
          className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
        />
      </div>
      <div className="justify-center my-8 select-none flex">
        <button
          onClick={addTask}
          className="h-10 w-40 shadow-md no-underline rounded-full bg-purple-400 text-white font-sans font-semibold text-sm focus:outline-none active:shadow-none mr-2"
        >
          Add
        </button>
      </div>

      {todoList.length
        ? todoList?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-white font-bold text-xl"
            >
              <h1>
                {item.taskName} {item.deadLine} days
              </h1>
              <button onClick={() => handleDelete(item.id)} className="w-5 h-5">
                X
              </button>
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
