import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
// Helpers
import addNote from '../../utils/helpersFetch/notes/addNote';
// Interfaces
import { dataNote } from '../../utils/interfaces';


const CreateNote = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const createNoteMutation = useMutation({
        mutationFn: addNote,
        onSuccess: (data) => {
            if (!data.success) {
                setError(data.message);
                setTimeout(() => setError(undefined), 3000);
            }
            if (data.success) {
                //@ts-ignore
                queryClient.invalidateQueries("noteById");
                // setTimeout(() => setSuccess(undefined), 3000);
            }
        },
    });
    const handleCreateNote = (e: React.FormEvent) => {
        const uid = localStorage.getItem('uid')
        e.preventDefault();
        const note: dataNote = {
            // @ts-ignore
            title: e.target[0].value,
            // @ts-ignore
            description: e.target[1].value,
            // @ts-ignore
            owner_id: uid,
        };
        createNoteMutation.mutate(note);
    };
    return (
        <>
            <button onClick={() => {
                // @ts-ignore
                document.getElementById('my_modal_note').showModal()
            }} className="btn btn-success font-semibold btn-xs">
                Agregar nota
            </button>
            <dialog id="my_modal_note" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={(e) => { handleCreateNote(e) }} className="flex items-center justify-center p-12">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-xl font-bold">Title</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

                        </div>
                    </form>

                </div >
            </dialog >
        </>
    )
}
export default CreateNote