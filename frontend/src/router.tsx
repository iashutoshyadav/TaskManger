import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

// Pages
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import Summary from "@/pages/Summary";
import Chat from "@/pages/Chat";
import Calendar from "@/pages/Calendar";
import Notifications from "@/pages/Notification";
import Profile from "@/pages/Profile";
import NewTask from "@/pages/NewTask";

// Auth
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/new" element={<NewTask />} />
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
