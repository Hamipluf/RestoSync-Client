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
            <AddProductToStore />
          </div>
          <div className="bg-slate-300 rounded-lg">
            {data?.success ? (
              <div>
                <p className="text-xl font-bold text-dark">Hay productos</p>
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
