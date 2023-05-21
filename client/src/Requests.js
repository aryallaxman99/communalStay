const baseURL = "http://localhost:8000/";

const requests = {
  userRegister: `${baseURL}auth/register`,
  userLogin: `${baseURL}auth/login`,
};

export default requests;
