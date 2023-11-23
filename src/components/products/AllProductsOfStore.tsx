import React from "react";
// Redux
import { useAppDispatch } from "../../redux/hooks";
import { setHiddenProducts } from "../../redux/actions/productsSlice";
import getAllProductsOfStore from "../../utils/helpersFetch/products/getAllProductsOfStore";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
// Components
import AddProductToStore from "./AddProductToStore";
import { product } from "../../utils/interfaces";
const AllProductsOfStore: React.FC = () => {
  const dispatch = useAppDispatch();
  const sid = useSelector((state: RootState) => state.storeReducer.store.id);
  const { data, isLoading } = useQuery({
    queryKey: ["product-store", sid],
    queryFn: getAllProductsOfStore,
  });
  console.log(data);
  return (
    <>
      <div className="card w-full bg-neutral text-neutral-content h-auto">
        <button
          onClick={() => dispatch(setHiddenProducts())}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="card-body">
          <div className="grid grid-cols-2 justify-between">
            <h2 className="text-xl font-bold bg-slate-400 text-dark max-w-fit p-2 rounded-r-lg">
              Products
            </h2>
            {sid && <AddProductToStore sid={sid} />}
          </div>
          <div className="bg-slate-800 rounded-lg my-2">
            {data?.success ? (
              <div>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((product: product) => {
                        return (
                          <tr>
                            <th>
                              {product.title}
                            </th>
                            <td> {product.category}</td>
                            <td> {product.price}</td>
                            <td> {product.stock_quantity}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="">
                <p className="text-xl font-bold text-dark">{data?.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductsOfStore;
