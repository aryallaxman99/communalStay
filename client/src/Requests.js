const baseURL = "http://localhost:8000/";

const requests = {
  userRegister: `${baseURL}auth/register`,
  userLogin: `${baseURL}auth/login`,
  userProfile: `${baseURL}auth/profile`,
  photoUploadViaLink: `${baseURL}uploads/upload-via-link`,
  photoUpload: `${baseURL}uploads/`,
};

export default requests;
