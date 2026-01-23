import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

// Pages
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import Summary from "@/pages/Summary";
import Chat from "@/pages/Chat";
import Calendar from "@/pages/Calendar";
import Notifications from "@/pages/Notification";
import Profile from "@/pages/Profile";
import NewTask from "@/pages/NewTask";
import Projects from "@/pages/Projects";

// Auth
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/new" element={<NewTask />} />
            <Route path="summary" element={<Summary />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
