import { createContext, useContext, useState } from "react";
import { TaskFilters } from "@/types/task";

type TaskUIContextType = {
  filters: TaskFilters;
  setFilters: (filters: TaskFilters) => void;

  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
};

const TaskUIContext = createContext<TaskUIContextType | undefined>(
  undefined
);

export const TaskProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(
    null
  );

  return (
    <TaskUIContext.Provider
      value={{
        filters,
        setFilters,
        selectedTaskId,
        setSelectedTaskId
      }}
    >
      {children}
    </TaskUIContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskUIContext);
  if (!context) {
    throw new Error(
      "useTaskContext must be used inside TaskProvider"
    );
  }
  return context;
};
