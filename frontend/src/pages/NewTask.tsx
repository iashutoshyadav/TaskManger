import { useNavigate } from "react-router-dom";
import TaskForm from "@/components/TaskForm";

export default function NewTask() {
  const navigate = useNavigate();

  return (
    <TaskForm
      onClose={() => navigate("/dashboard/tasks")}
    />
  );
}
