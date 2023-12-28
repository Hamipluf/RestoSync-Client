import { useMutation } from "@tanstack/react-query";
// Toastify
import { toast } from "react-toastify";
// Helpers
import uploadImage from "../../utils/helpersFetch/files/uploadImage";
// Redux
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/actions/userSlice";

const ChangeImageProfile = () => {
  const dispatch = useDispatch();
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data);
        toast.error(data.message);
      }
      if (data.success) {
        dispatch(setProfile(data.data.Key));
        toast.success(data.message);
        //@ts-ignore
        queryClient.refetchQueries("profile-image");
        //@ts-ignore
        queryClient.invalidateQueries("profile-image");
        // @ts-ignore
        document.getElementById("my_modal_upload_proile").close();
      }
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const fileInput = event.target[0];
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("image", file);
      uploadImageMutation.mutate(formData);
    } else {
      toast.error("Por favor, selecciona un archivo.");
    }
  };

  return (
    <>
      <dialog id="my_modal_upload_proile" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center gap-y-5"
            // action="https://restosync-api.onrender.com/api/images/upload/"
            // method="POST"
            // encType="multipart/form-data"
          >
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
            />
            <button className="btn btn-success " type="submit">
              {uploadImageMutation.isPending ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Subir Foto"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ChangeImageProfile;
