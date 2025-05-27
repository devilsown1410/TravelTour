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
      <div className="flex justify-around items-start flex-row border-1 gap-2 p-2 h-screen overflow-y-auto bg-gray-100
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
