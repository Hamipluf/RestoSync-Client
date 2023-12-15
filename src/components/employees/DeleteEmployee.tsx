import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Helpers
import deleteEmployee from "../../utils/helpersFetch/employees/deleteEmployee";
// Toast
import { toast } from "react-toastify";

const DeleteEmployee: React.FC<{
  eid: number;
}> = ({ eid }) => {
  const queryClient = useQueryClient();
  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,

    onSettled: (data) => {
      if (!data?.success) {
        console.error(data?.message);
        toast.error(data?.message);
      } else {
        toast.success(data.message);
        //@ts-ignore
        queryClient.invalidateQueries("employee-store");
        //@ts-ignore
        queryClient.refetchQueries("employee-store");
        // @ts-ignore
        document.getElementById("my_modal_update_employee").close();
      }
    },
  });

  return (
    <>
      <button onClick={() => deleteEmployeeMutation.mutate(eid)}>
        {deleteEmployeeMutation.isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
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

export default DeleteEmployee;
