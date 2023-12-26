import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";

const ProfileImage = () => {
    const user = useSelector((state: RootState) => state.userReducer.user)
    const {data} = useQuery({
        queryKey: ["profile-image", ]
    })
  return (
    <img
      src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"
      alt="Profile"
      className="w-full h-full object-cover "
    />
  );
};

export default ProfileImage;
