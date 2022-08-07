import React from "react";
import { useState } from "react";

export const AddTodo = ({ handleAdd }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    handleAdd(text);
  };

  return (
    <div>
      <div>
        <input onChange={handleChange} placeholder="something" />
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};
