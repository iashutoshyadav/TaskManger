import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import AppRouter from "./router";
import { queryClient } from "./lib/queryClient";
import { TaskProvider } from "./context/TaskContext";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ✅ React Query Provider MUST be at top */}
    <QueryClientProvider client={queryClient}>
      {/* ✅ UI-only context */}
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
