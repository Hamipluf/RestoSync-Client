import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
// Helepers
import getImage from "../../utils/helpersFetch/files/getImage";
import HoverableImage from "./HoverableImage";

const ProfileImage: React.FC<{
  width: string;
  height: string;
  hover: boolean;
}> = ({ width, height, hover }) => {
  const [isHover, setHover] = useState(false);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const { data, isLoading } = useQuery({
    queryKey: ["profile-image", user.profile_photo],
    queryFn: getImage,
    enabled: !!user.profile_photo,
  });

  const handleHover = () => {
    setHover(!isHover);
  };
  return (
    <>
      {isLoading || !data?.data ? (
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
          <HoverableImage
            width={width}
            height={height}
            hover={hover}
            imageSrc={data.data.url}
            alt="Profile"
          />
        </>
      )}
    </>
  );
};

export default ProfileImage;
