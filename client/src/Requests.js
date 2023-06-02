const baseURL = "http://localhost:8000/";

const requests = {
  userRegister: `${baseURL}auth/register`,
  userLogin: `${baseURL}auth/login`,
  userProfile: `${baseURL}auth/profile`,
  photoUploadViaLink: `${baseURL}uploads/upload-via-link`,
  photoUpload: `${baseURL}uploads/`,
  places: `${baseURL}places/`,
  getAllPlaces: `${baseURL}places/all`,
  getPlacesById: `${baseURL}places/`,
};

export default requests;
