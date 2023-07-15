const baseURL = "http://localhost:8000/";

const requests = {
  userRegister: `${baseURL}auth/register`,
  userLogin: `${baseURL}auth/login`,
  userLogout: `${baseURL}auth/logout`,
  verifyToken: `${baseURL}auth/verify`,
  userProfile: `${baseURL}auth/profile`,
  changePassword: `${baseURL}auth/changePassword`,
  photoUploadViaLink: `${baseURL}uploads/upload-via-link`,
  photoUpload: `${baseURL}uploads/`,
  places: `${baseURL}places/`,
  getAllPlaces: `${baseURL}places/all`,
  getPlacesByOwnerId: `${baseURL}places/owner-places`,
  getPlacesById: `${baseURL}places/`,
  updatePlaces: `${baseURL}places/update`,
  reserve: `${baseURL}reservation`,
  cancelReservation: `${baseURL}reservation?id=`,
  verifyEmail: `${baseURL}otp/identify`,
  verifyOTP: `${baseURL}otp/verifyOTP`,
  resetPassword: `${baseURL}otp/resetPassword`,
  sendOTP: `${baseURL}otp/sendOTP`,
  search: `${baseURL}places/search?q=`,
};

export default requests;
