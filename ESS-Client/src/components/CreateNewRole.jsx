import React from "react";

function CreateNewRole() {
  return (
    <div className="w-[95%] flex justify-between p-5 pb-10">
      <div className="w-[100%] m-auto">
        <h1 className="text-xl text-gray-100 align-middle font-medium text-center mb-8">
          Add new Role
        </h1>
        <form className="w-[100%]">
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Role name
              </label>
              <div className="mt-2 mb-2">
                <input type="text" name="name" id="name" />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="teamDescription"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Role discription
              </label>
              <div className="mt-2 mb-2">
                <textarea name="description" id="" cols="30" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
          >
            Add Role
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewRole;
