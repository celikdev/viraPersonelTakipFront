import React, { useContext, useState } from "react";
import { timelineContext } from "../Context/Timeline";

const Button = () => {
  const { timeline, setTimeline } = useContext(timelineContext);
  const buttonData = [
    {
      id: 1,
      name: "Günlük",
      state: "daily",
    },
    {
      id: 2,
      name: "Aylık",
      state: "monthly",
    },
  ];

  return (
    <div className=" flex justify-around gap-8 mx-4">
      {buttonData.map((button) => (
        <button
          disabled={button.state === "monthly" ? true : false}
          key={button.id}
          onClick={() => setTimeline(button.state)}
          className={`w-1/2 border-2 py-2 rounded-full border-blue-500 text-white disabled:border-gray-600 disabled:bg-gray-300 disabled:text-gray-600  ${
            timeline === button.state
              ? "bg-blue-500 shadow-white text-white shadow-2xl transition-colors duration-300"
              : "bg-transparent text-black"
          }`}
        >
          <h1 className="text-center text-sm font-bold">{button.name}</h1>
        </button>
      ))}
    </div>
  );
};

export default Button;
