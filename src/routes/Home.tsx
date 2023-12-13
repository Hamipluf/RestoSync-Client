// Components
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";
import Note from "../components/notes/Note";
import Tasks from "../components/tasks/Tasks";
import TaskDetails from "../components/tasks/TaskDetails";
// Redux
import { useAppDispatch } from "../redux/hooks";
import { invalidateNote } from "../redux/actions/noteSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { invalidateTask } from "../redux/actions/taskSlice";
// Toastify notification
import { ToastContainer } from "react-toastify";
import CommentsOfNote from "../components/comments/CommentsOfNote";

function Home() {
  const dispatch = useAppDispatch();
  const note = useSelector((state: RootState) => state.noteReducer.note);

  return (
    <>
      <SideBar />
      <div className="grid grid-cols-3 min-h-screen w-full p-4 gap-x-5">
        <div className="col-span-2 ml-10 bg-neutral rounded-lg">
          <Tasks />
          <div className="divider mx-2"></div>
          {note.id && <CommentsOfNote />}
        </div>
        <div className=" bg-neutral rounded-lg">
          <div className="">
            <div className="flex w-full justify-between">
              <h2 className="m-4 font-semibold text-midLigth text-xl">
                Seleccione una tarea
              </h2>
              <button
                onClick={() => {
                  dispatch(invalidateTask()), dispatch(invalidateNote());
                }}
                className="btn btn-circle btn-ghost text-xl btn-sm m-2"
              >
                X
              </button>
            </div>
            <div className="divider mx-4"></div>
            <TaskDetails />
            <div className="divider mx-4 mb-0"></div>
            <Note />
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick  
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </>
  );
}

export default Home;
