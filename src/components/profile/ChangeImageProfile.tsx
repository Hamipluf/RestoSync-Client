import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
// Toastify
import { toast } from "react-toastify";
// Helpers
import uploadImage from "../../utils/helpersFetch/files/uploadImage";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProfileImage = () => {
  const [hover, setHover] = useState(false);
  const user = useSelector((state: RootState) => state.userReducer.user)
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message)
      }
      if (data.success) {
        toast.success(data.message)
        //@ts-ignore
        queryClient.refetchQueries("product-store");
        //@ts-ignore
        queryClient.invalidateQueries("product-store");
        // @ts-ignore
        document.getElementById("my_modal_add_product").close();
      }
    },
  });

  const handleHover = () => {
    setHover(!hover);
  };
  
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const file = event.target.image.files[0];
    if (file) {
      uploadImageMutation.mutate(file);
    } else {
      console.log('Por favor, selecciona un archivo.');
    }
  };

  return (
    <>
      <div className="relative inline-block hover:cursor-pointer">
        <div
          className={`w-40 h-40 border-4 border-white rounded-full overflow-hidden ${
            hover ? "bg-white bg-opacity-75 z-10" : "bg-inherit"
          }`}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
     <ProfileImage/>
          {hover && (
            <div
              onClick={() =>
                // @ts-ignore
                document.getElementById("my_modal_upload_proile").showModal()
              }
              className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-10  bg-white w-40 h-40 border-4 border-white rounded-full overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-edit text-gray-800"
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
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <dialog id="my_modal_upload_proile" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form>
            <input type="file" className="file-input w-full max-w-xs" />
            <button className="btn btn-success " type="submit">
              Subir Foto
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ProfileImage;
