import React from "react";
import { useMutation } from "@tanstack/react-query";
// Helpers
import deleteNote from "../../utils/helpersFetch/notes/deleteNotes";
// Redux
import { useQueryClient } from "@tanstack/react-query";
import { invalidateNote } from "../../redux/actions/noteSlice";
// Toastify
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";

const DeleteNote: React.FC<{
  nid: number | undefined;
}> = ({ nid }) => {
  const queryClient = useQueryClient();
  const dispath = useAppDispatch();
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess(data) {
      if (!data.success) {
        console.error(data);
        toast.error(data.message);
      }
      if (data.success) {
        dispath(invalidateNote());
        toast.success(data.message);
        // @ts-ignore
        queryClient.invalidateQueries("noteByTask");
        // @ts-ignore
        queryClient.refetchQueries("noteByTask");
      }
    },
  });

  const handleDeleteNote = (): void => {
    if (!nid) {
      toast.error("Falta indicar la nota");
      return;
    }
    deleteNoteMutation.mutate(nid);
  };

  return (
    <>
      <button
        onClick={() => handleDeleteNote()}
        className="btn btn-error btn-sm"
      >
        {deleteNoteMutation.isPending ? (
          <>
            <span className="loading loading-ring loading-md"></span>
          </>
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

export default DeleteNote;
