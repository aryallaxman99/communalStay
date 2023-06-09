const baseURL = "http://localhost:8000/";

const requests = {
  userRegister: `${baseURL}auth/register`,
  userLogin: `${baseURL}auth/login`,
  userLogout: `${baseURL}auth/logout`,
  userProfile: `${baseURL}auth/profile`,
  photoUploadViaLink: `${baseURL}uploads/upload-via-link`,
  photoUpload: `${baseURL}uploads/`,
  places: `${baseURL}places/`,
  getAllPlaces: `${baseURL}places/all`,
  getPlacesByOwnerId: `${baseURL}places/owner-places`,
  getPlacesById: `${baseURL}places/`,
  updatePlaces: `${baseURL}places/update`,
};

export default requests;
