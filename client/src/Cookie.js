import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const Cookie = (props) => {
  const cookies = new Cookies();
  console.log(props);
  // cookies.set("jwt-authorization",props.token)
  return <div>Cookie</div>;
};

export default Cookie;
