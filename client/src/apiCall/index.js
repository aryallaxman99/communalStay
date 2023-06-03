import { toast } from "react-toastify";
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
      if (result.data.msg && displaySuccessMessage) {
        toast.success(result.data.msg);
      }
    }

    return result;
  } catch (error) {
    toast.error(
      error?.response?.data?.msg ||
        "Something went wrong, please try again later."
    );
    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

export default getApiResponse;
