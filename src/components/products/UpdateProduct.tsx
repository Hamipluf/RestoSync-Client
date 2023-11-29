import React from "react";
// Interfaces
import {
  product,
  updateProduct as updateProductIterface,
} from "../../utils/interfaces";
import { useMutation } from "@tanstack/react-query";
// Helpers
import updateProduct from "../../utils/helpersFetch/products/updateProduct";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const UpdateProduct: React.FC = () => {
  const product = useSelector(
    (state: RootState) => state.productReducer.product
  );
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
      }
      //@ts-ignore
      queryClient.invalidateQueries("product-store");
      //@ts-ignore
      queryClient.refetchQueries("product-store");
      // @ts-ignore
      document.getElementById("my_modal_update_product").close();
    },
  });
  const handleSubmtit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateDataStore: updateProductIterface = {
      pid: product.id,
      // @ts-ignore
      title: e.target[0].value ? e.target[0].value : product.title,
      // @ts-ignore
      description: e.target[1].value ? e.target[1].value : product.price,
      // @ts-ignore
      price: e.target[2].value ? e.target[2].value : product.price,
      // @ts-ignore
      stock_quantity: e.target[3].value
        ? // @ts-ignore
          e.target[3].value
        : product.stock_quantity,
      // @ts-ignore
      category: e.target[4].value ? e.target[4].value : product.category,
      store_id: product.store_id,
    };
    console.log(updateDataStore);
    // updateProductMutation.mutate(updateDataStore);
  };
  return (
    <>
      <button
        onClick={() =>
          //   @ts-ignore
          document.getElementById("my_modal_update_product").showModal()
        }
        className="btn btn-info btn-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-edit"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width={2}
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
          <path d="M16 5l3 3" />
        </svg>
      </button>
      <dialog id="my_modal_update_product" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div>
            <h1 className=" font-bold text-3xl flex gap-1 items-baseline font-mono">
              Actualizar Datos
              <span className="text-sm text-accent">{product.title}</span>
            </h1>
            <span className="text-xs font-semibold text-midLigth opacity-40 ">
              Complete solo los campos a actualizar.
            </span>
            <form
              onSubmit={(e) => handleSubmtit(e)}
              className="w-full mt-1 grid grid-cols-1 rounded-md border-t-4 border-info"
            >
              <div className="flex gap-4">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nombre del local</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Razon Social</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Direccion</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">CUIT</span>
                </div>
                <input type="text" placeholder="12-12345678-9" />
              </label>

              <button
                type="submit"
                disabled={updateProductMutation.isPending}
                className="mt-4 btn btn-success btn-wide text-lg justify-self-center"
              >
                {updateProductMutation.isPending ? (
                  <>
                    <span className="loading loading-ring loading-lg"></span>
                  </>
                ) : (
                  <>Actualizar</>
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UpdateProduct;
