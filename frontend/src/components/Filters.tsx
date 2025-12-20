import { TaskFilters, TaskPriority, TaskStatus } from "@/types/task";

interface Props {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

const Filters = ({ filters, onChange }: Props) => {
  return (
    <div className="bg-white p-4 rounded-md shadow flex flex-col md:flex-row gap-4">
      <select
        value={filters.status ?? ""}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value as TaskStatus })
        }
        className="border p-2 rounded w-full md:w-auto"
      >
        <option value="">All Status</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="REVIEW">Review</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select
        value={filters.priority ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            priority: e.target.value as TaskPriority
          })
        }
        className="border p-2 rounded w-full md:w-auto"
      >
        <option value="">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>
    </div>
  );
};

export default Filters;
