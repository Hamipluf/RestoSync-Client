import { useQuery } from "@tanstack/react-query";
import React from "react";
// Helpers
import getCommentOfNote from "../../utils/helpersFetch/comments/getCommentOfNote";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// Components
import AddCommentToNote from "./AddCommentToNote";

const CommentsOfNote: React.FC = () => {
  const note = useSelector((state: RootState) => state.noteReducer.note);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comment-note", note?.id],
    queryFn: getCommentOfNote,
  });
  console.log(data?.data.length);
  return (
    <>
      <h2 className="text-xl font-bold text-light mx-4 underline underline-offset-4">
        Commentarios
      </h2>
      <AddCommentToNote />

      {data && data.data.length < 1 ? (
        <>
          <h2 className="text-xl text-error m-4 font-bold ">
            No hay comentarios para la nota
          </h2>
        </>
      ) : (
        <>
          {/* Comentarios */}
          <div className="rounded-xl border p-5 shadow-md m-4 bg-white">
            <div className="flex w-full items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                <div className="text-lg font-bold text-slate-700">
                  Joe Smith
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                  Category
                </button>
                <div className="text-xs text-neutral-500">2 hours ago</div>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <div className="mb-3 text-xl font-bold">
                Nulla sed leo tempus, feugiat velit vel, rhoncus neque?
              </div>
              <div className="text-sm text-neutral-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                consequatur vitae similique deserunt voluptatibus incidunt hic
                officia. Est distinctio sequi eaque, maiores facere deleniti
                veniam, ullam repudiandae fugit ab voluptatibus!
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CommentsOfNote;
