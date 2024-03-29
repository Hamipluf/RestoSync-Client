import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// Helpers
import addNote from "../../utils/helpersFetch/notes/addNote";
// Interfaces
import { dataAddNote } from "../../utils/interfaces/note";
// Toastify
import { toast } from "react-toastify";

const AddNoteToTask: React.FC<{
  tid: number;
}> = ({ tid }) => {
  const queryClient = useQueryClient();
  const uid = useSelector((state: RootState) => state.userReducer.user.id);
  const createNoteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
        console.error(data);
      }
      if (data.success) {
        //@ts-ignore
        queryClient.invalidateQueries("noteByTask");
        // @ts-ignore
        document.getElementById("my_modal_note").close();
      }
    },
  });
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (uid) {
      const note: dataAddNote = {
        task_id: tid,
        // @ts-ignore
        title: e.target[0].value,
        // @ts-ignore
        description: e.target[1].value,
        // @ts-ignore
        owner_id: uid,
      };
      createNoteMutation.mutate(note);
    } else {
      toast.error("Error en crear la nota.");
      console.error("Falta el user_id.");
    }
  };
  return (
    <>
      <button
        onClick={() => {
          // @ts-ignore
          document.getElementById("my_modal_note").showModal();
        }}
        className="btn btn-success font-semibold btn-xs"
      >
        Agregar nota
      </button>
      <dialog id="my_modal_note" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            onSubmit={(e) => {
              handleCreateNote(e);
            }}
            className="flex flex-col items-center justify-center p-12"
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-xl font-bold">Titulo</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Descripcion</span>
              </label>
              <textarea className="textarea textarea-bordered h-24 textarea-lg"></textarea>
            </div>
            {createNoteMutation.isPending ? (
              <>
                <button type="submit" className="btn btn-primary btn-wide my-4">
                  <span className="loading loading-ring loading-md"></span>
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn btn-primary btn-wide my-4">
                  Agregar
                </button>
              </>
            )}
          </form>
        </div>
      </dialog>
    </>
  );
};
export default AddNoteToTask;
