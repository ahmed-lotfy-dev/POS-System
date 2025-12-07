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
      if (resData.data?.access_token) {
        const token = resData.data.access_token;
        localStorage.setItem("user", JSON.stringify(token));
        notify(`Signed up successfull`, "success");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground w-full">
      <div className="bg-card rounded-lg shadow-xl p-8  w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form
          ref={formRef}
          className="flex flex-col space-y-4"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="input input-bordered border-border input-sm w-full bg-background text-foreground"
            type="text"
            name="username"
            placeholder="Your name"
          />

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

          <input
            className="input input-bordered border-border input-sm w-full bg-background text-foreground"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />

          <Button variant="default" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="pt-4 text-center">
          <Link
            to="/signin"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
