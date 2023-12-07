import React from "react";
import { comment } from "../../utils/interfaces";

const AddCommentToNote = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const commentData: comment = {

    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="m-4">
      <textarea
        placeholder="Agrega tu comentario..."
        className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[60px] border-[#9EA5B1] rounded-md w-full"
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-sm font-semibold absolute bg-[#4F46E5] w-fit text-white py-2 rounded px-3"
        >
          Comentar
        </button>
      </div>
    </form>
  );
};

export default AddCommentToNote;
