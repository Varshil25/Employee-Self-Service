import React, { useState } from "react";
import { options, subOptions } from "./utils/SideBarOptions.js";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/appContext.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function SideBar() {
  const { role, toggleSubOption, isSubOptionOpen } = useGlobalContext();
  const path = useLocation();
  return (
    <div className="fixed top-20 h-full w-[15%] bg-slate-800 text-gray-800 backdrop-blur-md rounded-md">
      <div className="">
        <ul className="text-gray-400">
          {options.map((option) => {
            if (option.role === "any" || role.toLowerCase() === option.role) {
              return (
                <Link to={option.pathName} key={option.id}>
                  <li
                    className={`text-center py-2 cursor-pointer duration-200 hover:text-slate-800 rounded hover:bg-gray-400 flex items-center ${
                      path.pathname === option.pathName &&
                      "bg-gray-400 text-slate-800"
                    }`}
                  >
                    <div className="px-3">{<option.icon />}</div>
                    {option.text}
                    {option.text.toLowerCase() === "admin options" ? (
                      !isSubOptionOpen ? (
                        <div onClick={toggleSubOption} className="ease-in-out">
                          <ExpandMoreIcon />
                        </div>
                      ) : (
                        <div onClick={toggleSubOption} className="ease-in-out">
                          <ExpandLessIcon />
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </li>
                  {option.text.toLowerCase() === "admin options" && (
                    <div
                      className={`${
                        !isSubOptionOpen ? "hidden" : "flex flex-col"
                      } duration-300 ease-out height-[100px]`}
                    >
                      <ul className="flex flex-col ml-8">
                        {subOptions.map((subOption) => {
                          return (
                            <Link to={subOption.pathName} key={subOption.id}>
                              <li
                                className={`text-center py-2 cursor-pointer duration-200 hover:text-slate-800 rounded hover:bg-gray-400 flex items-center ${
                                  path.pathname === subOption.pathName &&
                                  "bg-gray-400 text-slate-800"
                                }`}
                              >
                                <div className="px-3">{<subOption.icon />}</div>
                                {subOption.text}
                              </li>
                              <div className="border-b-2 border-neutral-400/40 border-spacing-x-3"></div>
                            </Link>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  <div className="border-b-2 border-neutral-400/40 border-spacing-x-3"></div>
                </Link>
              );
            }
          })}
        </ul>
      </div>
      <div className="punchOptions"></div>
    </div>
  );
}

export default SideBar;
