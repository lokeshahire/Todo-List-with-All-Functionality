export const getTodos = (args = {}) => {
  const { titlesortBy = "ASC", page = 1 } = args;
  return fetch(
    `http://localhost:3008/task?_sort=title&_order=${titlesortBy}&_page=${page}&_limit=7`
  ).then((res) => res.json());
};

export const addTodos = (todo) => {
  return fetch("http://localhost:3008/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
};

export const toggleTodo = (id, newStatus) => {
  return fetch(`http://localhost:3008/task/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  }).then((res) => res.json());
};

export const deleteTodo = (id) => {
  return fetch(`http://localhost:3008/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
