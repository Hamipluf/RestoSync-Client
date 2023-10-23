import React from "react";

function SideBar() {
  return (
    <>
      {" "}
      <div className="bg-gray-800 text-white min-h-screen w-28 flex flex-col m-2 rounded-xl">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Sidebar Title</h2>
        </div>
        <ul className="flex-1 overflow-y-auto">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Item 1</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Item 2</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Item 3</li>
          {/* Agrega más elementos de la lista según sea necesario */}
        </ul>
        <div className="p-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
            Botón
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
