import React from "react";

export const TodoList = ({ title, status, id, handleToggle, handleDelete }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "20px",
          justifyContent: "space-around",
        }}
      >
        <b style={{ width: "150px", textAlign: "left" }}>{title}</b>
        {status ? "  DONE" : "  NOT DONE"}
        <button onClick={() => handleToggle(id, !status)}>TOGGLE STATUS</button>
        <button onClick={() => handleDelete(id)}>DELETE</button>
      </div>
    </div>
  );
};
