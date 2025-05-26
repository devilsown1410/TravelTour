import React from "react";
import Todo from "../../components/Todo/Todo";
import Done from "../../components/Done";
import InProgress from "../../components/InProgress";
import Header from "../../components/Header";
import Approved from "../../components/Approved";
import { useState } from "react";

const Board = () => {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <>
      <Header />
      <div className="flex justify-around items-center flex-row border-2 border-blue-500 p-3 mb-3 rounded shadow mt-3 gap-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 hover:shadow-xl hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-600 dark:hover:border-blue-400 
      ">
        <Todo toggleRefresh={toggleRefresh} />
        <InProgress toggleRefresh={toggleRefresh} />
        <Done toggleRefresh={toggleRefresh} />
        <Approved toggleRefresh={toggleRefresh} />
      </div>
    </>
  );
};

export default Board;
