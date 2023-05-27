// import axios from "../utility/axios"
import { toast } from "react-hot-toast";
import http from "./axios";

const getApiResponse = async ({
  url,
  method = "get",
  type = "application/json",
  data = {},
  otherParams = {},
  displaySuccessMessage = true,
}) => {
  try {
    const myHeader = {
      "Content-Type": type,
    };

    const result = await http({
      method,
      url: `${url}`,
      data,
      headers: myHeader,
      params: {
        ...otherParams,
      },
      accept: "*/*",
    });

    if (method !== "get") {
      if (result.data.message && displaySuccessMessage) {
        toast.success(result.data.message);
      }
    }

    return result;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong, please try again later."
    );
    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

export default getApiResponse;
