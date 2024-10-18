import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { BACKEND_PATH } from "../../constants/config";
import BackButton from "../../components/common/BackButton";

const FaceUpload = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    axios
      .post(`${BACKEND_PATH}/face/upload`, formData)
      .then((response) => {
        setMessage(response.data.message);
        setFile(response.data.file);
      })
      .catch((error) => {
        setMessage("Error uploading image");
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center px-8">
      <div className="flex flex-col gap-2">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {file ? (
                <div className="relative">
                  <img alt="from server" src={`${BACKEND_PATH}/${file.path}`} />
                  <div className="absolute top-0 left-0 w-full h-full animate-image-check border-t-4"></div>
                </div>
              ) : (
                <p className="border p-8">
                  Drag & drop an image here, or click to select an image
                </p>
              )}
            </div>
          )}
        </Dropzone>
        <p>{message}</p>
        <div className="flex justify-between">
          <BackButton />
          <div className="flex gap-2">
            <button>Skip</button>
            <button>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceUpload;
