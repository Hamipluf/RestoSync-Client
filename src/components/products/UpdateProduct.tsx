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
import { useAppDispatch } from "../../redux/hooks";
import { setProduct } from "../../redux/actions/productsSlice";
// Toast
import { toast } from "react-toastify";
const UpdateProduct: React.FC = () => {
  const product = useSelector(
    (state: RootState) => state.productReducer.product
  );
  const dispatch = useAppDispatch();
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      toast.success(data.message);
      dispatch(setProduct(data.data));
      //@ts-ignore
      queryClient.invalidateQueries("product-store");
      //@ts-ignore
      queryClient.refetchQueries("product-store");
      // @ts-ignore
      document.getElementById("my_modal_update_9").close();
    },
  });
  const handleSubmtit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateDataStore: updateProductIterface = {
      pid: product.id,
      // @ts-ignore
      title: e.target[0].value ? e.target[0].value : product.title,
      // @ts-ignore
      category: e.target[1].value ? e.target[1].value : product.category,
      // @ts-ignore
      description: e.target[2].value ? e.target[2].value : product.price,
      // @ts-ignore
      price: e.target[3].value ? e.target[3].value : product.price,
      // @ts-ignore
      stock_quantity: e.target[4].value
        ? // @ts-ignore
          e.target[4].value
        : product.stock_quantity,
      // @ts-ignore
      store_id: product.store_id,
    };
    updateProductMutation.mutate(updateDataStore);
  };
  return (
    <>
      <button
        onClick={() =>
          //   @ts-ignore
          document.getElementById("my_modal_update_9").showModal()
        }
        className="btn btn-info btn-xs"
        disabled={!product.id}
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
      <dialog id="my_modal_update_9" className="modal">
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
              className="w-full mt-1 grid grid-cols-1 justify-items-center rounded-md border-t-4 border-info"
            >
              <div className="flex w-full gap-2 items-start">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nombre</span>
                  </div>
                  <input
                    type="text"
                    placeholder={product.title}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Categoria</span>
                  </label>
                  <select className="select select-bordered select-sm">
                    <option disabled selected>
                      {product.category}
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
                  placeholder={product.description}
                ></textarea>
              </label>
              <div className="flex gap-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Precio</span>
                  </div>
                  <input
                    type="text"
                    placeholder={`$${product.price}`}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Stock</span>
                  </div>
                  <input
                    type="number"
                    placeholder={product.stock_quantity}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>

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
