import React, { useCallback, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { BACKEND_PATH } from "../../constants/config";
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import { addToast } from "../../redux/toastSlice";

const FaceUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [face, setFace] = useState("");
  const [faceDetails, setFaceDetails] = useState(null);

  const onCheck = async (path) => {
    try {
      const response = await axios.get(
        `${BACKEND_PATH}/face/verify?path=${path}`
      );
      setMessage(response.data.message);
      dispatch(
        addToast({
          message: response.data.message,
          type: "success",
        })
      );
      setFace(path);
      setFaceDetails(response.data.FaceDetails);
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
        dispatch(
          addToast({
            message: `Image uploaded. Checking ...`,
            type: "info",
          })
        );
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("Analysing ...");
        }, 500);
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
        const response = await axios.post(
          `${BACKEND_PATH}/user/face?userId=${userId}`,
          {
            path: face,
          }
        );
        dispatch(
          updateUser([
            { key: "face", value: face },
            { key: "point", value: response.data.point },
          ])
        );
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [face, userId, dispatch, navigate]);

  return (
    <>
      <div className="mt-16 mb-28 flex justify-center px-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <span className="text-white text-lg text-center font-semibold">
              Keep your face within the frame
            </span>
            <span className="text-white text-xs text-center">
              Ensure good lighting and no obstruction
            </span>
          </div>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {file ? (
                  <div className="relative w-[300px] h-[300px] rounded-2xl">
                    <img
                      alt="face from server"
                      src={`${BACKEND_PATH}/${file.path}`}
                      width={300}
                      height={300}
                      className="rounded-2xl w-[300px] h-[300px]"
                    />
                    {faceDetails && (
                      <div
                        className="absolute border-2 shadow-[0_0_8px_#55A]"
                        style={{
                          height: faceDetails.BoundingBox.Height * 300,
                          left: faceDetails.BoundingBox.Left * 300,
                          top: faceDetails.BoundingBox.Top * 300,
                          width: faceDetails.BoundingBox.Width * 300,
                        }}
                      />
                    )}
                    {!faceDetails && (
                      <div className="absolute top-0 left-0 w-full animate-image-check border-b-4 border-t-4 py-1 rounded-lg bg-black border-white"></div>
                    )}
                  </div>
                ) : (
                  <p className="border p-8 text-white w-[300px] h-[300px] flex justify-center items-center text-2xl text-center">
                    Drag & drop an image here, or click to select an image
                  </p>
                )}
              </div>
            )}
          </Dropzone>
          <div className="flex flex-col gap-2">
            <div className="text-center text-white font-semibold">
              {message}
            </div>
            <div className="flex justify-between">
              <button className="text-white underline" onClick={handleSkip}>
                Skip
              </button>
              <button
                className="text-white underline"
                disabled={!face}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
          <div className="w-full">
            <BackButton
              title="Cancel"
              classnames="w-full py-1 rounded-xl border-[#33D3C4] border-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FaceUpload;
