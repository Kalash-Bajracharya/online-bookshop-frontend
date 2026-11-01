
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/home");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-700"
    >
      <LogOut size={16} />
      Log Out
    </button>
  );
};

export default Logout;
