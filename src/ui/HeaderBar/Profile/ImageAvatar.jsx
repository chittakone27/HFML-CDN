import React from "react";

export const useAvatarImgSrc = (avatarId, baseUrl) => {
  return avatarId
    ? [baseUrl, "api/fileResources", avatarId, "data"]
        .filter((part) => !!part)
        .map((part) => part.replace(/^\/+|\/+$/g, ""))
        .join("/")
    : null;
};

const ImageAvatar = ({ avatarId, dataTest, baseUrl }) => {
  const src = useAvatarImgSrc(avatarId, baseUrl);
  return (
    <>
      <img src={src} alt="user avatar" data-test={dataTest} />
      <style jsx>{`
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default ImageAvatar;
