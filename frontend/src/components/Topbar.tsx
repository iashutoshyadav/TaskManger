import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("/tasks")) return "Tasks";
    if (location.pathname.includes("/notifications")) return "Notifications";
    if (location.pathname.includes("/profile")) return "Profile";
    return "Dashboard";
  };

  return (
    <div className="w-full flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {getTitle()}
        </h1>
        <p className="text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Right */}
      <button
        onClick={() => navigate("/dashboard/tasks/new")}
        className="bg-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-600 transition"
      >
        + Create Task
      </button>
    </div>
  );
}
