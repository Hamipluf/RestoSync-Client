import React, { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useMutation } from "@tanstack/react-query";
// Helpers
import { updateUser } from "../../utils/helpersFetch/user/updateUser";
// Toastify
import { toast } from "react-toastify";
// Interfaces
import { user } from "../../utils/interfaces/user";
import { setUser } from "../../redux/actions/userSlice";

const UpdateUserInfo: React.FC = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const user = useSelector((state: RootState) => state.userReducer.user);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      toast.success(data.message);
      dispatch(setUser(data.data));
      setEdit(false)
      //@ts-ignore
      queryClient.invalidateQueries("user");
      // @ts-ignore
      queryClient.refetchQueries("user");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      user.id &&
      user.name &&
      user.last_name &&
      user.email &&
      user.role &&
      user.profile_photo &&
      user.username
    ) {
      const updateData: user = {
        id: user.id,
        //    @ts-ignore
        name: e.target[0].value ? e.target[0].value : user.name,
        //    @ts-ignore
        last_name: e.target[1].value ? e.target[1].value : user.last_name,
        //    @ts-ignore
        username: e.target[2].value ? e.target[2].value : user.username,
        //    @ts-ignore
        email: e.target[3].value ? e.target[3].value : user.email,
        role: user.role,
        profile_photo: user.profile_photo,
      };
      updateUserMutation.mutate(updateData);
    } else {
      toast.error("Faltan completar campos.");
    }
  };
  return (
    <>
      <div className="w-full flex flex-col 2xl:w-1/3">
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between">
            <h4 className="text-xl text-gray-900 font-bold">
              Informacion Presonal
            </h4>
            <button
              onClick={() => setEdit(!edit)}
              className=" btn btn-blue-600 btn-sm text-gray-100 text-sm space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user-edit h-4 w-4 "
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" />
              </svg>
              <span>Editar Perfil</span>
            </button>
            {edit && (
              <button
                onClick={() => setEdit(false)}
                className="btn btn-error btn-square"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-square-rounded-x-filled m-auto"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                    fill="currentColor"
                    stroke-width="0"
                  />
                </svg>
              </button>
            )}
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-2 text-gray-700"
          >
            <div className="flex gap-x-5 border-y py-3 w-full">
              <div className="flex">
                <span className="font-bold w-24">Nombre:</span>
                {edit ? (
                  <input
                    className="input input-bordered input-primary input-sm text-light"
                    type="text"
                    placeholder={user.name}
                  />
                ) : (
                  <span className="text-gray-700">{user.name}</span>
                )}
              </div>

              <div className="flex">
                <span className="font-bold w-24">Apellido:</span>
                {edit ? (
                  <input
                    className="input input-bordered input-primary input-sm text-light"
                    type="text"
                    placeholder={user.last_name}
                  />
                ) : (
                  <span className="text-gray-700">{user.last_name}</span>
                )}
              </div>
              <div className="flex">
                <span className="font-bold w-24">Username:</span>
                {edit ? (
                  <input
                    className="input input-bordered input-primary input-sm text-light"
                    type="text"
                    placeholder={user.username}
                  />
                ) : (
                  <span className="text-gray-700">{user.username}</span>
                )}
              </div>
            </div>

            <div className="flex border-b py-3">
              <span className="font-bold w-24">Celular:</span>
              <span className="text-gray-700">(123) 123-1234</span>
            </div>
            <div className="flex border-b py-3">
              <span className="font-bold w-24">Email:</span>
              {edit ? (
                <input
                  className="input input-bordered input-primary input-sm text-light"
                  type="text"
                  placeholder={user.email}
                />
              ) : (
                <span className="text-gray-700">{user.email}</span>
              )}
            </div>
            <div className="flex border-b py-3">
              <span className="font-bold w-24">Ultima conexion:</span>
              <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
            </div>
            <div className="flex justify-end">
              {edit && (
                <button type="submit" className="btn btn-success mt-2">
                  { updateUserMutation.isPending ? <span className="loading loading-spinner loading-md"></span> :
                  "Guardar"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUserInfo;
