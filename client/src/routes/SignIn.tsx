import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { notify } from "../lib/toast";
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
import { Mail, Lock, Eye, EyeOff, Info } from "lucide-react";

interface SignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<SignInForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
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
    },
  });

  const handleSubmit = async (values: SignInForm) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const resData = await res.json();

      // Handle HTTP error responses (4xx, 5xx)
      if (!res.ok || resData.statusCode >= 400) {
        notify(resData.message || "Login failed", "error");
        return;
      }

      // Backend wraps response in { code, message, data }
      // Extract the actual auth data from resData.data
      const authData = resData.data;

      // Check if tokens exist in the wrapped response
      if (!authData || !authData.access_token) {
        notify("Invalid response from server", "error");
        return;
      }

      // Success - store both tokens
      localStorage.setItem("user", JSON.stringify(authData.access_token));
      localStorage.setItem("refresh_token", authData.refresh_token);
      notify("Signed in successfully", "success");
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      notify(error.message || "Network error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-default-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="flex flex-col gap-1 items-center pt-8 pb-4">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-default-500">Sign in to your account</p>
        </CardHeader>

        <Divider />

        <CardBody className="gap-4 py-6">
          {/* Test Accounts Information Alert */}
          <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-3 flex gap-2">
            <Info className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div className="text-sm w-full">
              <p className="font-semibold text-success mb-2">
                Demo Accounts for Testing
              </p>
              <div className="space-y-2 text-default-600 text-xs">
                <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                  <p className="font-semibold text-primary">
                    💰 CASHIER Account
                  </p>
                  <p>
                    <strong>Email:</strong> cashier@gmail.com
                  </p>
                  <p>
                    <strong>Password:</strong> 00000000
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                  <p className="font-semibold text-default-600">
                    👁️ VIEWER Account (Read-Only)
                  </p>
                  <p>
                    <strong>Email:</strong> viewer@gmail.com
                  </p>
                  <p>
                    <strong>Password:</strong> 00000000
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={form.onSubmit(handleSubmit)}
          >
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
              placeholder="Enter your password"
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

            <Button
              type="submit"
              color="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-semibold"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardBody>

        <Divider />

        <CardFooter className="flex justify-center py-4">
          <div className="text-center text-sm">
            <span className="text-default-500">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export { SignIn };
