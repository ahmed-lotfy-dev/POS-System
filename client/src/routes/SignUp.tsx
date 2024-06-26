import { Button } from "@/components/ui/button";
import { notify } from "@/lib/toast";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    console.log(username);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    try {
      if (password !== confirmPassword) return;
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );
      const resData = await res.json();
      console.log(resData);
      if (resData.msg) {
        notify(` User allready exist`, "error");
        navigate("/signup");
        formRef.current?.reset();
      }
      if (resData.access_token) {
        const token = resData.access_token;
        localStorage.setItem("user", JSON.stringify(token));
        notify(`Signed up successfull`, "success");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
      <div className="w-full">
        <h2 className="text-center text-3xl">Sign Up </h2>
      </div>
      <div className="flex flex-col w-1/2"></div>
      <div className="w-1/2">
        <form
          ref={formRef}
          className="flex flex-col m-auto"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 m-auto"
            type="text"
            name="username"
            placeholder="Your name..."
          />

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

          <input
            className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 m-auto"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />

          <div>
            <div className="w-full">
              <Button className="btn btn-neutral w-1/3 mt-2 mb-3 m-auto block">
                Sign Up
              </Button>
            </div>
            <div className="mt-6 text-center">
              <Link to="/signin">Don't have an account? Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
