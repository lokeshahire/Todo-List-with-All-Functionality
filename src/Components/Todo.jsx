import { useEffect } from "react";
import { useState } from "react";
import { addTodos, deleteTodo, getTodos, toggleTodo } from "../api/todos";
import { AddTodo } from "./AddTodo";
import Pagination from "./Pagination";
import { TodoList } from "./TodoList";

function Todo() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [titlesortBy, setTitleSortBy] = useState("ASC");
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleGetTodos();
  }, [titlesortBy, page]);

  const handleGetTodos = () => {
    setLoading(true);
    return getTodos({
      titlesortBy,
      page,
    })
      .then((res) => {
        setLoading(false);
        setTodos(res);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleAdd = (text) => {
    const item = {
      title: text,
      status: false,
    };
    setLoading(true);
    addTodos(item)
      .then((res) => {
        console.log(res);
        handleGetTodos();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleToggle = (id, newStatus) => {
    setLoading(true);
    toggleTodo(id, newStatus)
      .then((res) => {
        handleGetTodos();
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleDelete = (id) => {
    setLoading(true);
    deleteTodo(id)
      .then((res) => {
        handleGetTodos();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        marginTop: "50px",
      }}
    >
      <AddTodo handleAdd={handleAdd} />
      <div>
        <button
          onClick={() => {
            setTitleSortBy((prev) => (prev === "ASC" ? "DESC" : "ASC"));
          }}
        >
          {titlesortBy === "ASC" ? "MAKE DESCENDING" : "MAKE ASCENDING"}
        </button>
        <div>
          <select name="" id="">
            <option value="">All</option>
            <option value="">Pending</option>
            <option value="">Completed</option>
          </select>
        </div>
      </div>
      <h3>PENDING</h3>
      <div>{loading && "Loading!"}</div>
      {todos
        .filter((item) => !item.status)
        .map((item) => (
          <TodoList
            key={item.id}
            title={item.title}
            status={item.status}
            id={item.id}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}

      <div>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button>{page}</button>

        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>

      <Pagination
        total={10}
        current={page}
        onChange={(value) => setPage(value)}
      />

      <h3>COMPLETED TASK</h3>
      {todos
        .filter((item) => item.status)
        .map((item) => (
          <TodoList
            key={item.id}
            title={item.title}
            status={item.status}
            id={item.id}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
}
export default Todo;
