import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/appContext";

function CreateNewEmployee() {
  const { authFetch } = useGlobalContext();
  const [newEmployee, setNewEmployee] = useState({});
  const [allTeams, setAllTeams] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    authFetch
      .get("/role/all")
      .then((res) => {
        setAllRoles(res.data);
      })
      .catch((err) => console.log(err));

    authFetch
      .get("/team/all")
      .then((res) => {
        setAllTeams(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewEmployee((employee) => ({
      ...employee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newEmployee);
    authFetch
      .post("/employee", newEmployee)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[95%] flex justify-between p-5 pb-10">
      <div className="w-[100%] m-auto">
        <h1 className="text-xl text-gray-100 align-middle font-medium text-center mb-8">
          Add new Emplyee
        </h1>
        <form className="w-[100%]">
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                First Name
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Last Name
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Email
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-10">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Password
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Role
              </label>
              <div className="mt-2 mb-2">
                <select
                  name="roleId"
                  id="role"
                  className="w-[100%]"
                  defaultValue={""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ---------------select role---------------
                  </option>
                  {allRoles.map((role) => (
                    <option
                      value={role.id}
                      key={role.id}
                      className="text-center"
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="team"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Team
              </label>
              <div className="mt-2 mb-2">
                <select
                  name="teamId"
                  id="team"
                  className="w-[100%]"
                  defaultValue={""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ---------------select team---------------
                  </option>
                  {allTeams.map((team) => (
                    <option
                      value={team.id}
                      key={team.id}
                      className="text-center"
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewEmployee;
