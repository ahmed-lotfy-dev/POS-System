import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { setUser } from "@/store/features/user/userSlice";
import { Button, Card, CardBody, Avatar, Chip } from "@heroui/react";
import { TbLogout } from "react-icons/tb";

export function UserProfile() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    dispatch(setUser(null));
    navigate("/");
  };

  if (!user.user) {
    return null;
  }

  return (
    <div className="p-4">
      <Card className="bg-default-100 dark:bg-default-50 shadow-md">
        <CardBody className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar
              name={user.user.username}
              size="md"
              className="bg-primary text-white font-semibold"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">
                {user.user.username}
              </p>
              <Chip size="sm" color="primary" variant="flat" className="mt-1">
                {user.user.role}
              </Chip>
            </div>
          </div>
          <Button
            size="md"
            color="danger"
            variant="flat"
            className="w-full font-medium"
            startContent={<TbLogout size={18} />}
            onPress={handleLogout}
          >
            Logout
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
