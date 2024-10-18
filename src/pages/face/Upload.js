import React, { useCallback, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { BACKEND_PATH } from "../../constants/config";
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";

const FaceUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [face, setFace] = useState("");

  const onCheck = async (path) => {
    try {
      const response = await axios.get(
        `${BACKEND_PATH}/face/verify?path=${path}`
      );
      setMessage(response.data.message);
      setFace(path);
    } catch (error) {
      console.log(error);
      setMessage("Invalid image, no face detected");
    }
  };

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    axios
      .post(`${BACKEND_PATH}/face/upload`, formData)
      .then((response) => {
        setMessage(response.data.message);
        setFile(response.data.file);
        onCheck(response.data.file.path);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error uploading image");
      });
  };

  const handleSkip = useCallback(() => navigate("/"), [navigate]);

  const handleContinue = useCallback(() => {
    if (!face) return;
    (async () => {
      try {
        await axios.post(`${BACKEND_PATH}/user/email?userId=${userId}`, {
          path: face,
        });
        dispatch(updateUser([{ key: "face", value: face }]));
        navigate("/face-upload");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [face, userId, dispatch, navigate]);

  return (
    <div className="h-screen w-screen flex justify-center items-center px-8">
      <div className="flex flex-col gap-2">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {file ? (
                <div className="relative">
                  <img alt="face from server" src={`${BACKEND_PATH}/${file.path}`} />
                  <div className="absolute top-0 left-0 w-full h-full animate-image-check border-t-8"></div>
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
            <button onClick={handleSkip}>Skip</button>
            <button disabled={!face} onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceUpload;
