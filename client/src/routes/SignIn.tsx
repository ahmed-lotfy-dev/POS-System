import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from "../lib/toast";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const email = data.get("email") as string;
      const password = data.get("password") as string;

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const resData = await res.json();
      console.log(resData);
      console.log(res);
      const token = resData.access_token;
      console.log(token);
      if (resData.statusCode === 403) {
        notify(resData.message, false);
      } else {
        console.log(resData);
        console.log(token);
        const userToken = localStorage.setItem("user", JSON.stringify(token));
        console.log(userToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
      <div className="w-full">
        <h2 className="text-center text-3xl">Sign In </h2>
      </div>
      <div className="w-1/2">
        <form
          className="flex flex-col m-auto"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 m-auto"
            type="email"
            name="email"
            placeholder="Email..."
          />

          <input
            className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 m-auto"
            type="password"
            name="password"
            placeholder="Password"
          />

          <div>
            <div className="w-full">
              <button className="btn btn-neutral w-1/3 mt-2 mb-3 m-auto block">
                Sign In
              </button>
            </div>
            <div className="mt-6 text-center">
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export { SignIn };
