import axios from "axios";
import { BACKEND_PATH } from "../constants/config";

export const sendPoint = async (point, progress, userId) => {
  if (point === 0 || userId === "") return;
  try {
    await axios.get(
      `${BACKEND_PATH}/user/setPoint?userId=${userId}&point=${point}&progress=${progress}`
    );
  } catch (error) {
    console.log(error);
  }
};
