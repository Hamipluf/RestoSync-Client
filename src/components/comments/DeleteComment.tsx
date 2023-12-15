import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
// Tastify
import { toast } from "react-toastify";
// Helpers
import deleteComment from "../../utils/helpersFetch/comments/deleteComment";
const DeleteComment: React.FC<{ cid: number }> = ({ cid }) => {
  const queryClient = useQueryClient()
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        //@ts-ignore
        queryClient.invalidateQueries("comment-note");
        //@ts-ignore
        queryClient.refetchQueries("comment-note");
      }
    },
  });
  const handleDelete = () => {
    if (!cid) {
      toast.error("Seleccione un comentario.");
    }
    if (cid) {
      deleteCommentMutation.mutate(cid);
    }
  };
  return (
    <>
      <button
        onClick={() => handleDelete()}
        className="rounded-2xl border bg-warning px-3 py-1 text-xs font-semibold hover:bg-error hover:text-light transition-all ease-in duration-150 opacity-70 hover:opacity-100"
      >
        {deleteCommentMutation.isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        )}
      </button>
    </>
  );
};

export default DeleteComment;
