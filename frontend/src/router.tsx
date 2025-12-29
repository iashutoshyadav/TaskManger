import { BrowserRouter, Routes, Route } from "react-router-dom";

function DashboardTest() {
  console.log("✅ DashboardTest component rendered");
  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard Route Works</h1>
      <p>If you see this, routing is OK.</p>
    </div>
  );
}

function LoginTest() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Login Page</h1>
    </div>
  );
}

export default function AppRouter() {
  console.log("🚦 AppRouter mounted");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginTest />} />
        <Route path="/dashboard" element={<DashboardTest />} />
      </Routes>
    </BrowserRouter>
  );
}
