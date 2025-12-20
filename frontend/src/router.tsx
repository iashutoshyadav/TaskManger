import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

import DashboardLayout from "@/layouts/DashboardLayout";

// Pages
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import Summary from "@/pages/Summary";
import Chat from "@/pages/Chat";
import Calendar from "@/pages/Calendar";
import Notifications from "@/pages/Notification";
import Profile from "@/pages/Profile";

// Components
import TaskForm from "@/components/TaskForm";

// Auth
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/new" element={<TaskForm />} />
          <Route path="summary" element={<Summary />} />
          <Route path="chat" element={<Chat />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
