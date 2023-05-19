import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Sign Up</h1>
        <h2 className="text-xl text-center mb-4">Welcome to CommunialStay</h2>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="primary">SignUp</button>
          <div className="text-center py-2" text-gray-500>
            Already have an account?
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
