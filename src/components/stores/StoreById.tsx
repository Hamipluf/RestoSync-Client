import React from "react";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const StoreById = () => {
  const store = useSelector((state: RootState) => state.storeReducer.store);
  return (
    <>
      <div className="card w-96 bg-primary mx-4 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{store.company_name}</h2>
          <p>Nombre: {store.name}</p>
          <p>Direccion: {store.address}</p>
          <p>CUIT: {store.cuit}</p>
        </div>
      </div>
    </>
  );
};

export default StoreById;
