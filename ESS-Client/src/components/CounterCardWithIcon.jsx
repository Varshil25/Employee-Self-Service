import React from "react";

function CounterCardWithIcon({ count, heading, icon, color, bg }) {
  return (
    <div
      className={`${color} ${bg} flex text-lg rounded-lg items-center align-middle min-h-20 my-5 cursor-pointer`}
    >
      <div className="px-7">{icon}</div>
      <div className="flex flex-col pl-2 justify-center items-center">
        <h1 className="py-2">{heading}&nbsp;</h1>
        <span className="bg-slate-200 mb-3 text-slate-400 rounded-[50%] px-2">
          {count}
        </span>
      </div>
    </div>
  );
}

export default CounterCardWithIcon;
