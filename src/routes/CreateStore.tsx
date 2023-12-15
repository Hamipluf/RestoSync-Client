import React from "react";
import img1 from "../assets/aside-create-store.jpg";
// Components
import AddStore from "../components/stores/AddStore";
// Toastify
import { ToastContainer } from "react-toastify";
const CreateStore: React.FC = () => {
  return (
    <>
      <div className="min-h-screen p-6 bg-neutral flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-light">
              Bienvenido a RestoSync
            </h2>
            <p className="text-gray-500 mb-6">
              Para comenzar llene los datos de la empresa.
            </p>

            <div className="bg-primary rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="min-h-full">
                  <img
                    className="h-full object-cover"
                    src={img1}
                    alt="Anotando en una Notebook."
                  />
                </div>
                <AddStore />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default CreateStore;
