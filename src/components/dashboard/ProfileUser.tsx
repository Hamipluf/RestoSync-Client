import React from 'react'
// Redux
import { getCurrent } from '../../utils/helpersFetch/user/current';
import { useQuery } from '@tanstack/react-query';

const ProfileUser = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrent,
    });
    return (
        <>
           {
            
           }
            <div className='grid grid-cols-4 m-4 bg-secondary p-10 rounded-badge justify-items-center gap-4'>
                {/* Avatar */}
                <div className="avatar justify-self-start">
                    <div className="w-32 mask mask-squircle">
                        <img src="data:image/png;base64,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" />

                    </div>
                </div>
                {/* Data user */}
                <div className="card bg-base-100 shadow-xl col-span-2">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>

                    </div>
                </div>
                {/* ?*/}
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileUser
