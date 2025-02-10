import React from "react";

function CounterCard({ countHeading, count, bg }) {
  return (
    <div
      className={`${
        bg == "red"
          ? "bg-red-400 text-red-700 font-semibold duration-300 hover:shadow-[0_5px_40px_5px_rgba(100,0,0,0.7)]"
          : bg == "green"
          ? "bg-green-600 text-green-800 font-semibold duration-300 hover:shadow-[0_5px_40px_5px_rgba(0,100,0,0.7)]"
          : bg == "blue"
          ? "bg-blue-400 text-blue-700 font-semibold duration-300 hover:shadow-[0_5px_40px_5px_rgba(0,0,70,0.5)]"
          : "bg-gray-500 text-gray-800 font-semibold duration-300 hover:shadow-[0_5px_40px_5px_rgba(33,33,33,0.7)]"
      }  rounded-md flex flex-col align-middle items-center justify-center cursor-pointer min-w-32 min-h-24`}
    >
      <div className="p-3">
        <h3 className="mb-2">{countHeading}</h3>
        <h4 className="text-center">{count}</h4>
      </div>
    </div>
  );
}

export default CounterCard;
