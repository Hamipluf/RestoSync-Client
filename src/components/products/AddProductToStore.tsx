import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Interfaces
import { addProduct as addProductInterface } from "../../utils/interfaces";
// Helpers
import addProduct from "../../utils/helpersFetch/products/addProduct";
// Toast
import { toast } from "react-toastify";

const AddProductToStore: React.FC<{
  sid: number;
}> = ({ sid }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>("");
  const createProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message)
      }
      if (data.success) {
        toast.success(data.message)
        //@ts-ignore
        queryClient.refetchQueries("product-store");
        //@ts-ignore
        queryClient.invalidateQueries("product-store");
        // @ts-ignore
        document.getElementById("my_modal_add_product").close();
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: addProductInterface = {
      // @ts-ignore
      title: e.target[0].value,
      // @ts-ignore
      category: e.target[1].value,
      // @ts-ignore
      description: e.target[2].value,
      // @ts-ignore
      price: e.target[3].value,
      // @ts-ignore
      stock_quantity: e.target[4].value,
      // @ts-ignore
      store_id: sid,
    };
    createProductMutation.mutate(product);
  };

  return (
    <>
      <button
        onClick={() =>
          // @ts-ignore
          document.getElementById("my_modal_add_product").showModal()
        }
        className="btn btn-square btn-info btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-square-rounded-plus"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
          <path d="M15 12h-6" />
          <path d="M12 9v6" />
        </svg>
      </button>

      <dialog id="my_modal_add_product" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h1 className=" font-bold text-3xl flex gap-1 items-baseline font-mono">
              Crear Producto
              <span className="text-sm text-accent">{name}</span>
            </h1>

            <span className="text-xs font-semibold text-midLigth opacity-40 ">
              Complete solo los campos a actualizar.
            </span>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="w-full mt-1 grid grid-cols-1 justify-items-center rounded-md border-t-4 border-info"
            >
              <div className="flex w-full gap-2 items-start">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nombre</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Categoria</span>
                  </label>
                  <select required className="select select-bordered select-sm">
                    <option disabled selected>
                      Seleccionar
                    </option>
                    <option>Pasteleria</option>
                    <option>Cafeteria</option>
                    <option>Cocina</option>
                  </select>
                </div>
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Descripcion</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-18 "
                  placeholder="..."
                ></textarea>
              </label>
              <div className="flex gap-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Precio</span>
                  </div>
                  <input
                    type="text"
                    placeholder="$..."
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Stock</span>
                  </div>
                  <input
                    type="number"
                    placeholder="..."
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={createProductMutation.isPending}
                className="mt-4 btn btn-success btn-wide text-lg justify-self-center"
              >
                {createProductMutation.isPending ? (
                  <>
                    <span className="loading loading-ring loading-lg"></span>
                  </>
                ) : (
                  <>Agregar</>
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddProductToStore;
