import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import AppRouter from "./router";
import { queryClient } from "./lib/queryClient";
import { TaskProvider } from "./context/TaskContext";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
