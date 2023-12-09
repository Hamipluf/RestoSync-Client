import { useQuery } from "@tanstack/react-query";
import React from "react";
// Helpers
import getCommentOfNote from "../../utils/helpersFetch/comments/getCommentOfNote";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// Components
import AddCommentToNote from "./AddCommentToNote";
import { comment } from "../../utils/interfaces";
// Style
import "../../styles/index.css";
// Toastify notification
import { toast } from "react-toastify";

const CommentsOfNote: React.FC = () => {
  const note = useSelector((state: RootState) => state.noteReducer.note);
  const uid = localStorage.getItem("uid");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comment-note", note?.id],
    queryFn: getCommentOfNote,
  });
  isError && toast.error(error.message);
  const dataSorted = data?.data.slice().reverse();
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateToCheck = new Date(date);

    if (dateToCheck.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (dateToCheck.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    } else {
      return dateToCheck.toLocaleString();
    }
  };
  return (
    <>
      <h2 className="text-xl font-bold text-light mx-4 underline underline-offset-4">
        Commentarios
      </h2>
      <AddCommentToNote />
      <div className="h-64 overflow-y-scroll scroll-bar">
        {data && data.data.length < 1 ? (
          <>
            <h2 className="text-xl text-error m-4 font-bold ">
              No hay comentarios para la nota
            </h2>
          </>
        ) : (
          <>
            {isLoading ? (
              <>
                <div className="flex flex-col gap-4 w-11/12 p-4">
                  <div className="skeleton h-16 w-11/12"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-11/12"></div>
                  <div className="skeleton h-4 w-11/12"></div>
                </div>
              </>
            ) : (
              <>
                {dataSorted && dataSorted.map((comment: comment) => {
               
                  return (
                    <div className="rounded-xl border p-5 shadow-md m-4 bg-white">
                      <div className="flex w-full items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                          <div className="text-lg font-bold text-slate-700">
                            {`${comment.user_name} ${comment.user_last_name}`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          {uid && parseInt(uid) === comment.user_id && (
                            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                              Editar
                            </button>
                          )}
                          <div className="text-xs text-neutral-500">
                            {comment.updated_at
                              ? formatDate(comment.updated_at)
                              : formatDate(comment.created_at)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 mb-6">
                        <div className="text-sm text-dark opacity-90">
                          {comment.body}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CommentsOfNote;
