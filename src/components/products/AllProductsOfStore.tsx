import React, { useState } from "react";
// Redux
import { useAppDispatch } from "../../redux/hooks";
import { setProduct } from "../../redux/actions/productsSlice";
import getAllProductsOfStore from "../../utils/helpersFetch/products/getAllProductsOfStore";
import { useQuery } from "@tanstack/react-query";
// Components
import { product } from "../../utils/interfaces/products";
import DeleteProduct from "./DeleteProduct";
// Style
import "../../styles/index.css";
const AllProductsOfStore: React.FC<{ sid: number }> = ({ sid }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["product-store", sid],
    queryFn: getAllProductsOfStore,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredProducts =
    data?.success &&
    data.data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <>
      {data?.success ? (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <input
                type="text"
                placeholder="Buscar productos 🔎"
                onChange={handleInputChange}
                className="input input-bordered input-sm  max-w-xs"
              />
            </div>
            <div>
            </div>
          </div>
          <div className="overflow-auto h-60 scroll-bar mt-5">
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
                    {data.success &&
                      filteredProducts &&
                      filteredProducts.map((product: product) => {
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
          <p className="text-xl font-bold text-error">{data?.message}</p>
        </div>
      )}
    </>
  );
};

export default AllProductsOfStore;
