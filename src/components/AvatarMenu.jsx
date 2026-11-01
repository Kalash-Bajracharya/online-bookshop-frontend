import { Avatar, Menu } from "@mantine/core";
import { UserRound, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";

const AvatarMenu = ({ user, setUser }) => {
  return (
    <Menu shadow="md" width={200} position="bottom-end" withArrow>
      <Menu.Target>
        <Avatar
          radius="xl"
          color="#2F3A1d"
          size="md"
          className="cursor-pointer"
        >
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{user?.name || "My Account"}</Menu.Label>

        <Menu.Item
          leftSection={<UserRound size={16} />}
          component={Link}
          to="/user/Profile"
        >
          My Profile
        </Menu.Item>

        <Menu.Divider />

        <Logout setUser={setUser} />
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarMenu;
