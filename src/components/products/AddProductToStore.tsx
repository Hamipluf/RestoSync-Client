import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Interfaces
import { addProduct } from "../../utils/interfaces";
// Helpers

const AddProductToStore: React.FC = () => {
  const queryClient = useQueryClient();
  const createProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
      }
      if (data.success) {
        //@ts-ignore
        queryClient.invalidateQueries("noteByTask");
        // @ts-ignore
        document.getElementById("my_modal_note").close();
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: addProduct = {
      // @ts-ignore
      title: e.target[0].value,
      // @ts-ignore
      category: e.target[1].value,
      // @ts-ignore
      stock_quantity: e.target[2].value,
      // @ts-ignore
      price: e.target[3].value,
    };
    console.log(product);
  };

  return (
    <>
      <button
        onClick={() =>
          // @ts-ignore
          document.getElementById("my_modal_add_product").showModal()
        }
        className="btn btn-wide btn-info"
      >
        Add Product
      </button>

      <dialog id="my_modal_add_product" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="grid grid-cols-1 justify-items-center gap-2"
          >
            <div className="justify-self-start">
              <h2 className="text-xl font-bold bg-slate-400 text-dark max-w-fit p-2 rounded-r-lg ">
                Producto
              </h2>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Nombre <span className="font-bold text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs input-sm"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Categoria</span>
              </label>
              <select className="select select-bordered select-sm">
                <option disabled selected>
                  Seleccionar
                </option>
                <option>Panaderia</option>
                <option>Cafeteria</option>
                <option>Cocina</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">
                    Stock <span className="font-bold text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">
                    Precio <span className="font-bold text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </div>
            </div>
            <div>
              <button className="btn btn-info btn-wide my-2">Agregar</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddProductToStore;
