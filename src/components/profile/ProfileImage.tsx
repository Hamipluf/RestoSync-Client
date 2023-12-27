import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
// Helepers
import getImage from "../../utils/helpersFetch/files/getImage";

const ProfileImage = () => {
  const [hover, setHover] = useState(false);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const { data, isLoading } = useQuery({
    queryKey: ["profile-image", user.profile_photo],
    queryFn: getImage,
    enabled: !!user.profile_photo
  });

  const handleHover = () => {
    setHover(!hover);
  };
  return (
    <>
      {isLoading ? (
        <>
          <div className="relative inline-block ">
            <div
              className="w-40 h-40 border-4 border-white rounded-full overflow-hidden "
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <div className="skeleton w-full h-full rounded-full shrink-0"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative inline-block hover:cursor-pointer">
            <div
              className={`w-40 h-40 border-4 border-white rounded-full overflow-hidden ${
                hover ? "bg-white bg-opacity-75 z-10" : "bg-inherit"
              }`}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              {data?.data ? (
                <img
                  src={data?.data.url}
                  alt="Profile"
                  className="w-full h-full object-cover "
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_2"
                    data-name="Layer 2"
                    viewBox="0 0 179.4 179.4"
                  >
                    <defs>
                      <clipPath id="clippath">
                        <path
                          d="M179.4 89.7c0 49.53-40.16 89.69-89.7 89.69S0 139.24 0 89.7 40.16 0 89.7 0s89.7 40.16 89.7 89.7Z"
                          style={{
                            strokeWidth: 0,
                            fill: "none",
                          }}
                        />
                      </clipPath>
                      <style>
                        {
                          ".cls-2,.cls-5,.cls-6,.cls-7{stroke-width:0}.cls-2{fill:#f1a167}.cls-5{fill:#de318b}.cls-6{fill:#eb7f5d}.cls-7{fill:#1d2953}"
                        }
                      </style>
                    </defs>
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        id="SVGID"
                        d="M179.4 89.7c0 49.53-40.16 89.69-89.7 89.69S0 139.24 0 89.7 40.16 0 89.7 0s89.7 40.16 89.7 89.7Z"
                        style={{
                          fill: "#61bbbd",
                          strokeWidth: 0,
                        }}
                      />
                      <g
                        style={{
                          clipPath: "url(#clippath)",
                        }}
                      >
                        <path
                          d="M106.93 118.54c.2.02 1.22.24 1.9.43.76.2 1.54.44 2.33.7 1.55.53 3.09 1.14 4.57 1.85 2.96 1.41 5.66 3.16 7.97 5.19 4.63 4.07 7.66 9.25 8.98 15.5.34 1.55.57 3.18.7 4.84l.44 6.23.83 12.62 1.56 25.29.38 6.09h20.68l-.02-7.13-1.03-25.4-.56-12.71-.32-6.44c-.15-2.56-.45-5.14-.95-7.73-1.84-10.38-7.45-20.76-15.47-27.96-3.96-3.65-8.38-6.62-13-8.95a63.918 63.918 0 0 0-7.12-3.07c-1.22-.45-2.45-.85-3.72-1.21-1.35-.38-2.39-.67-4.27-1.03l-.44-.09c-.35-.06-.7-.11-1.05-.13-6.05-.44-11.75 3.93-12.59 9.93-.92 6.51 3.72 12.45 10.21 13.18ZM41.38 197.28l.38-6.09 1.56-25.29.83-12.62.44-6.23c.14-1.66.37-3.29.7-4.84 1.32-6.25 4.35-11.43 8.98-15.5 2.31-2.03 5.01-3.77 7.97-5.19a40.073 40.073 0 0 1 6.9-2.55c.68-.19 1.7-.41 1.9-.43 6.38-.72 10.97-6.47 10.25-12.86-.72-6.38-6.47-10.97-12.86-10.24-.28.03-.56.06-.83.11l-.45.09c-1.88.36-2.92.65-4.27 1.03-1.27.37-2.51.77-3.72 1.21-2.43.88-4.8 1.9-7.11 3.07-4.63 2.34-9.04 5.3-13.01 8.95-8.02 7.21-13.62 17.59-15.46 27.96-.5 2.59-.8 5.17-.95 7.73l-.31 6.44-.56 12.71-1.03 25.4-.03 7.13h20.68Z"
                          className="cls-5"
                        />
                        <path
                          d="M133.31 197.27v-77.7c0-12.66-21.59-27.69-38.41-27.69l-7.1-.1v-2.29l2.2 2.4h.2l-6.73.1c-15.93 0-36.39 15.02-36.39 27.67v77.62h86.23Z"
                          className="cls-5"
                        />
                        <path
                          d="M97.37 77.51H80.61v15.95c0 2.27 1.04 4.84 9 4.84 5.03 0 7.26-2.17 7.76-4.07V77.51ZM114.31 63.04c0 1.75-1.42 3.17-3.17 3.17s-3.18-1.42-3.18-3.17 1.42-3.18 3.18-3.18c1.75 0 3.17 1.42 3.17 3.18ZM72.39 63.04c0 1.75-1.43 3.17-3.18 3.17s-3.18-1.42-3.18-3.17 1.42-3.18 3.18-3.18c1.75 0 3.18 1.42 3.18 3.18Z"
                          className="cls-2"
                        />
                        <path
                          d="M111.75 65.69c0 11.82-10.14 19.91-20.54 19.91-20.95 0-20.53-31.08-20.53-31.08 0-11.27 9.19-20.41 20.53-20.41 11.35 0 20.54 9.14 20.54 20.41v11.17Z"
                          className="cls-2"
                        />
                        <path
                          d="M101.38 60.34c-.41 0-.78.16-1.03.45-.22.25-.34.59-.34.94 0 .69.47 1.39 1.37 1.39.41 0 .77-.16 1.03-.45.21-.26.34-.59.34-.94 0-.69-.47-1.39-1.37-1.39ZM78.24 60.34c-.41 0-.78.16-1.03.45-.21.25-.33.59-.33.94 0 .69.46 1.39 1.36 1.39.42 0 .78-.16 1.03-.45.22-.26.34-.59.34-.94 0-.69-.46-1.39-1.37-1.39ZM92.1 70.01c-.15 0-.29 0-.42-.02a.439.439 0 0 1-.4-.48c.02-.24.21-.45.48-.4.89.08 1.58-.17 1.66-.38.03-.08-.06-.39-.8-.88-2.23-1.52-2.48-6.78-2.49-7.01 0-.25.18-.45.43-.46.26-.02.45.17.46.42.06 1.4.56 5.25 2.11 6.31.97.65 1.35 1.29 1.13 1.91-.25.69-1.2.98-2.14.98Z"
                          className="cls-7"
                        />
                        <path
                          d="M106.47 68.31c0 1.73-2.13 3.13-4.77 3.13s-4.77-1.4-4.77-3.13 2.14-3.12 4.77-3.12c2.63 0 4.77 1.4 4.77 3.12ZM83.41 68.31c0 1.73-2.14 3.13-4.77 3.13s-4.77-1.4-4.77-3.13 2.13-3.12 4.77-3.12c2.63 0 4.77 1.4 4.77 3.12Z"
                          className="cls-6"
                        />
                        <path
                          d="M82.25 72.71c.08 2.88 3.22 6.11 7.51 6.07 4.3.04 7.43-3.2 7.51-6.07-4.33 3.61-10.7 3.61-15.02 0Z"
                          style={{
                            fill: "#fff",
                            strokeWidth: 0,
                          }}
                        />
                        <path
                          d="M109.18 38.35s4.13-1.14-1.19-4.24c-5.32-3.11-11.05-2.37-11.05-2.37s5.32-4.95-9.91-3.48c-11.75 1.14-13.59 14.01-13.6 14.09-.09.34-.13.55-.13.55s-10.57-.02-3.66 17.44c1.62 3.38 1.56 2.78 1.56 2.78s1.34-5.29 5.68-7.69c3.82-2.11 2.59-5.84 2.05-7.26 1.88 2.07 5.83 5.72 7.86 3.44 2.44-2.74 5.8-4 10.15-.59 4.14 3.25 10.25 8.14 12.15 3.84 1.33 3.15 1.62 5.47 1.62 5.47 13.21-17.17-1.52-21.99-1.52-21.99Z"
                          className="cls-7"
                        />
                      </g>
                    </g>
                  </svg>
                </>
              )}
              {hover && (
                <div
                  onClick={() =>
                    // @ts-ignore
                    document
                      .getElementById("my_modal_upload_proile")
                      // @ts-ignore
                      .showModal()
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
        </>
      )}
    </>
  );
};

export default ProfileImage;
