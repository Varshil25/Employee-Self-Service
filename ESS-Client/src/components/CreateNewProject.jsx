import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useGlobalContext } from "../context/appContext";

function CreateNewProject() {
  const { authFetch } = useGlobalContext();
  const [employees, setEmployees] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [newProject, setNewProject] = useState({});

  useEffect(() => {
    authFetch
      .get("/employee/all")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewProject((proj) => ({
      ...proj,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authFetch
      .post("/project", newProject)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedItem);
  };
  const onRemove = (selectedList, removedItem) => {};

  return (
    <div className="w-[95%] flex justify-between p-5 pb-10">
      <div className="w-[100%] m-auto">
        <h1 className="text-xl text-gray-100 align-middle font-medium text-center mb-8">
          Add new Project
        </h1>
        <form className="w-[100%]">
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Project Name
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="text"
                  name="name"
                  id="projectName"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Status
              </label>
              <div className="mt-2 mb-2">
                <select
                  name="status"
                  id="status"
                  className="w-[100%]"
                  defaultValue={""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ---------------select status---------------
                  </option>
                  <option value="NEW" className="text-center">
                    New
                  </option>
                  <option value="IN_PROGRESS" className="text-center">
                    In progress
                  </option>
                  <option value="ON_HOLD" className="text-center">
                    On hold
                  </option>
                  <option value="COMPLETED" className="text-center">
                    Completed
                  </option>
                  <option value="CANCELED" className="text-center">
                    Canceled
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Members
              </label>
              <div className="mt-2 mb-2 text-black">
                <Multiselect
                  options={employees.map((employee) => ({
                    id: employee.id,
                    name: employee.firstName + " " + employee.lastName,
                  }))} // Options to display in the dropdown
                  selectedValues={selectedValues}
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>
            </div>
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewProject;
