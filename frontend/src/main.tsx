import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import AppRouter from "./router";
import { queryClient } from "./lib/queryClient";
import { TaskProvider } from "./context/TaskContext";
import { TimerProvider } from "./context/TimerContext";


import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <TimerProvider>
          <AppRouter />
        </TimerProvider>
      </TaskProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
