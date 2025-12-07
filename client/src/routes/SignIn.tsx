import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from "../lib/toast";
import { RootState } from "@/store/store";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

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
      const token = resData.data.access_token;
      console.log("Token from backend:", token);

      if (
        !token ||
        resData.statusCode === 403 ||
        resData.statusCode === 401 ||
        resData.statusCode === 500
      ) {
        notify(resData.message || "Login failed", "fail");
      } else {
        localStorage.setItem("user", JSON.stringify(token));
        console.log("Token saved to localStorage");
        notify(`Signed in successfully`, "success");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground w-full">
      <div className="bg-card rounded-lg shadow-xl p-8  w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
        <form
          className="flex flex-col space-y-4"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="input input-bordered border-border input-sm w-full bg-background text-foreground"
            type="email"
            name="email"
            placeholder="Email"
          />

          <input
            className="input input-bordered border-border input-sm w-full bg-background text-foreground"
            type="password"
            name="password"
            placeholder="Password"
          />

          <Button variant="default" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="pt-4 text-center">
          <p className="text-sm text-muted-foreground">email: test@gmail.com</p>
          <p className="text-sm">password: 0000</p>
          <Link
            to="/signup"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export { SignIn };
