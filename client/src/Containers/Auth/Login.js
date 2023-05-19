import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <h2 className="text-xl text-center mb-4">Welcome to CommunialStay</h2>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="primary">Login</button>
          <div className="text-center py-2" text-gray-500>
            Don't have account yet?
            <Link className="underline text-black" to={"/register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
