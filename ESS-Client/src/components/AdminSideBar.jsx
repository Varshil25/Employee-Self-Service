import React from "react";
import options from "./utils/SideBarOptions.js";

function AdminSideBar() {
  return (
    <div className="fixed h-full w-[15%] top-20 bg-gray-300/40 backdrop-blur-md rounded-md">
      <div className="">
        <ul className="text-slate-100">
          {options.map((option) => (
            <li
              key={option.id}
              className="text-center py-1 cursor-pointer duration-200 hover:text-slate-300"
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminSideBar;
