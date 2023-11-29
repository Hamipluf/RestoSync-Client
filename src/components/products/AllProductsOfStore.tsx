import React from "react";
// Redux
import { useAppDispatch } from "../../redux/hooks";
import { setProduct } from "../../redux/actions/productsSlice";
import getAllProductsOfStore from "../../utils/helpersFetch/products/getAllProductsOfStore";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
// Components
import AddProductToStore from "./AddProductToStore";
import { product } from "../../utils/interfaces";
import DeleteProduct from "./DeleteProduct";
const AllProductsOfStore: React.FC<{ sid: number }> = ({ sid }) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["product-store", sid],
    queryFn: getAllProductsOfStore,
  });
  return (
    <>
      {data?.success ? (
        <div>
          <div>
            <input
              type="text"
              placeholder="Buscar productos 🔎"
              className="input input-bordered input-sm  max-w-xs"
            />
          </div>
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
                {isLoading ? (
                  <>
                    <tr>
                      <th className="skeleton h-4 mx-2"></th>
                      <td className="skeleton h-4 mx-2"> </td>
                      <td className="skeleton h-4 mx-2"> </td>
                      <td className="skeleton h-4 mx-2"> </td>
                      <td className="skeleton h-4 mx-2"></td>
                    </tr>
                  </>
                ) : (
                  <>
                    {data.data.map((product: product) => {
                      return (
                        <tr key={product.id}>
                          <th
                            onClick={() => dispatch(setProduct(product))}
                            className="hover:bg-secondary hover:cursor-pointer hover:rounded-md"
                          >
                            {product.title}
                          </th>
                          <td> {product.category}</td>
                          <td> {product.price}</td>
                          <td className=""> {product.stock_quantity}</td>
                          <td>
                            {product.id && <DeleteProduct pid={product.id} />}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="">
          <p className="text-xl font-bold text-dark">{data?.message}</p>
        </div>
      )}
    </>
  );
};

export default AllProductsOfStore;
