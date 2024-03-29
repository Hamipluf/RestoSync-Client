import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
// Helpers
import deleteProduct from "../../utils/helpersFetch/products/deletePRoduct";
// Toast
import { toast } from "react-toastify";
const DeleteProduct: React.FC<{
  pid: number;
}> = ({ pid }) => {
  const queryClient = useQueryClient();
  const deleteMutationProduct = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message)
      }
      if (data.success) {
        toast.success(data.message)
        //@ts-ignore
        queryClient.invalidateQueries("product-store");
        //@ts-ignore
        queryClient.refetchQueries("product-store")
      }
    },
  });
  const handleDelete = () => {
    if (!pid) {
      console.error("Falta el product ID ");
    }
    pid && deleteMutationProduct.mutate(pid);
  };
  return (
    <>
      <button
        onClick={() => handleDelete()}
        className="btn btn-square btn-sm m-2 btn-error"
      >
        {deleteMutationProduct.isPending ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
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
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        )}
      </button>
    </>
  );
};

export default DeleteProduct;
