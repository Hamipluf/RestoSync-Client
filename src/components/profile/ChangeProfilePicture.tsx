import { useState } from "react";

const ProfileImage = () => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover);
  };

  return (
    <div className="relative inline-block hover:cursor-pointer">
      <div
        className={`w-40 h-40 border-4 border-white rounded-full overflow-hidden ${
          hover ? "bg-white bg-opacity-75 z-10" : "bg-inherit"
        }`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"
          alt="Profile"
          className="w-full h-full object-cover "
        />
        {hover && (
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-10  bg-white w-40 h-40 border-4 border-white rounded-full overflow-hidden">
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
  );
};

export default ProfileImage;
