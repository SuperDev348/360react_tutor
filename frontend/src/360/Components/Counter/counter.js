import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Counter() {
  const [count, setCount] = useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/counter/`).then((res) => {
      console.log(res.data);
      setCount(res.data);
    });
  }, []);

  const ids = count.filter((item) => {
    return item.title === "test postman";
  });
  const idss = ids.map((item) => {
    return item._id;
  });
  const con = ids.map((item) => {
    return item.count;
  });

  const increaseCounter = () => {
    axios
      .put(`http://localhost:5000/api/counter/${idss}/increment/`)
      .then((res) => {
        console.log(res.data);
      });
  };

  const addCounter = () => {
    axios.post(`http://localhost:5000/api/counter/`).then((res) => {
      console.log(res.data);
    });
  };

  console.log(con);

  return (
    <div>
      <button onClick={increaseCounter}>click</button>

      <div>
        <h1>{con}</h1>
      </div>
    </div>
  );
}
