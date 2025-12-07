import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { User, setUser } from "../store/features/user/userSlice";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      if (typeof token === "string") {
        try {
          console.log("Parsing token...");
          const parsedToken = JSON.parse(token);
          console.log("Decodeding token...");
          const decoded: any = jwtDecode(parsedToken);
          console.log("Decoded user:", decoded);
          const user = { ...decoded, id: decoded.sub };
          dispatch(setUser(user as User));
          console.log("User dispatched to store");
        } catch (error) {
          console.error("Error parsing/decoding token:", error);
          localStorage.removeItem("user");
        }
      }
    } else {
      console.log("No token found in localStorage");
    }
    setIsLoading(false);
  }, [token, dispatch]);

  const user = useSelector((state: RootState) => state.user);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user.user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export { ProtectedRoute };
