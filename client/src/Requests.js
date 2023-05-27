const baseURL = "http://localhost:8000/";

const requests = {
  userRegister: `${baseURL}auth/register`,
  userLogin: `${baseURL}auth/login`,
  userProfile: `${baseURL}auth/profile`,
  photoUpload: `${baseURL}uploads/download`,
};

export default requests;
