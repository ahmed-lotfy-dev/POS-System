import { notify } from "@/lib/toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@heroui/react";
import { Mail, Lock, User, Eye, EyeOff, Info } from "lucide-react";

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const form = useForm<SignUpForm>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: (value) => {
        if (!value) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        return null;
      },
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^\S+@\S+$/.test(value)) return "Invalid email format";
        return null;
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 4) return "Password must be at least 4 characters";
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match";
        return null;
      },
    },
  });

  const handleSubmit = async (values: SignUpForm) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        }
      );

      const resData = await res.json();

      // Handle HTTP error responses (4xx, 5xx)
      if (!res.ok || resData.statusCode >= 400) {
        notify(resData.message || "Signup failed", "error");
        return;
      }

      // Backend wraps response in { code, message, data }
      // Extract the actual auth data from resData.data
      const authData = resData.data;

      // Check if user already exists (backend returns { msg: "User already exist" })
      if (authData && authData.msg) {
        notify(authData.msg, "error");
        return;
      }

      // Check if tokens exist in the wrapped response
      if (!authData || !authData.access_token) {
        notify("Invalid response from server", "error");
        return;
      }

      // Success - store both tokens
      localStorage.setItem("user", JSON.stringify(authData.access_token));
      localStorage.setItem("refresh_token", authData.refresh_token);
      notify("Account created successfully!", "success");
      navigate("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      notify(error.message || "Network error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-default-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="flex flex-col gap-1 items-center pt-8 pb-4">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm text-default-500">Join us today</p>
        </CardHeader>

        <Divider />

        <CardBody className="gap-4 py-6">
          {/* Role Information Alert */}
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-3 flex gap-2">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-primary mb-1">
                Account Role: VIEWER
              </p>
              <p className="text-default-600 text-xs">
                New accounts are created as <strong>VIEWER</strong> with
                read-only access. Contact an administrator to upgrade your role
                to <strong>CASHIER</strong> or <strong>ADMIN</strong> for
                additional permissions.
              </p>
            </div>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <Input
              type="text"
              label="Username"
              placeholder="Enter your username"
              variant="bordered"
              startContent={<User className="w-4 h-4 text-default-400" />}
              isInvalid={!!form.errors.username}
              errorMessage={form.errors.username}
              {...form.getInputProps("username")}
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              startContent={<Mail className="w-4 h-4 text-default-400" />}
              isInvalid={!!form.errors.email}
              errorMessage={form.errors.email}
              {...form.getInputProps("email")}
            />

            <Input
              type={isPasswordVisible ? "text" : "password"}
              label="Password"
              placeholder="Create a password"
              variant="bordered"
              startContent={<Lock className="w-4 h-4 text-default-400" />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="w-4 h-4 text-default-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-default-400" />
                  )}
                </button>
              }
              isInvalid={!!form.errors.password}
              errorMessage={form.errors.password}
              {...form.getInputProps("password")}
            />

            <Input
              type={isConfirmPasswordVisible ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm your password"
              variant="bordered"
              startContent={<Lock className="w-4 h-4 text-default-400" />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible ? (
                    <EyeOff className="w-4 h-4 text-default-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-default-400" />
                  )}
                </button>
              }
              isInvalid={!!form.errors.confirmPassword}
              errorMessage={form.errors.confirmPassword}
              {...form.getInputProps("confirmPassword")}
            />

            <Button
              type="submit"
              color="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-semibold"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardBody>

        <Divider />

        <CardFooter className="flex justify-center py-4">
          <div className="text-center text-sm">
            <span className="text-default-500">Already have an account? </span>
            <Link
              to="/signin"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export { SignUp };
