import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// Interfaces
import { dataAddComment } from "../../utils/interfaces/comments";
// Helpers
import addCommentToNote from "../../utils/helpersFetch/comments/addCommentToNote";
// toastify Notification
import { toast } from "react-toastify";

const AddCommentToNote = () => {
  const [commentValue, setCommentValue] = useState("");
  const note = useSelector((state: RootState) => state.noteReducer.note);
  const uid = useSelector((state: RootState) => state.userReducer.user.id);
  const queryClient = useQueryClient();
  const addNoteMutation = useMutation({
    mutationFn: addCommentToNote,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      if (data.success) {
        setCommentValue("");
        //@ts-ignore
        queryClient.invalidateQueries("noteByTask");
        //@ts-ignore
        queryClient.refetchQueries("noteByTask");
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.id && uid) {
      const commentData: dataAddComment = {
        nid: note.id,
        user_id: parseInt(uid),
        // @ts-ignore
        comment: e.target[0].value,
      };
      addNoteMutation.mutate(commentData);
    } else {
      toast.error("Falta seleccionar una nota");
      console.error(`Falta el id de la nota ${note.id} o del usuario ${uid}`);
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="m-4 py-7">
      <textarea
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        placeholder="Agrega tu comentario..."
        className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[60px] border-[#9EA5B1] rounded-md w-full text-dark"
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-sm font-semibold absolute bg-[#4F46E5]  w-fit text-white py-2 rounded px-3"
        >
          {addNoteMutation.isPending ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            "Agregar"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddCommentToNote;
