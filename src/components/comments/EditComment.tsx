import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
// Heleprs
import editComment from "../../utils/helpersFetch/comments/editComment";
// Toastify
import { toast } from "react-toastify";
import { comment, dataUpdateComment } from "../../utils/interfaces/comments";

const EditComment: React.FC<{
  comment: comment;
  setEditComment: React.Dispatch<React.SetStateAction<any>>;
}> = ({ comment, setEditComment }) => {
  const queryClient = useQueryClient();
  const updateCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      if (data.success) {
        setEditComment(false);
        //@ts-ignore
        queryClient.invalidateQueries("comment-note");
        //@ts-ignore
        queryClient.refetchQueries("comment-note");
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.id) {
      toast.error("Seleccione un comentario.");
      return;
    }
    if (comment.id) {
      const commentUpdate: dataUpdateComment = {
        cid: comment.id,
        // @ts-ignore
        comment: e.target[0].value ? e.target[0].value : comment.body,
      };
      updateCommentMutation.mutate(commentUpdate);
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="">
        <textarea
          placeholder="Agrega tu comentario..."
          className="p-2 focus:outline-1 focus:outline-blue-500 font-bold resize-none border-[#9EA5B1] rounded-md w-full text-dark"
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-sm font-semibold bg-[#4F46E5]  w-fit text-white py-2 rounded px-3"
          >
            {updateCommentMutation.isPending ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Editar"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditComment;
