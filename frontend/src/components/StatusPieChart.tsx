import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Task } from "@/types/task";

const COLORS = ["#64748b", "#8b5cf6", "#f59e0b", "#10b981"];

type Props = {
  tasks: Task[];
};

export default function StatusPieChart({ tasks }: Props) {
  const data = [
    { name: "Pending", value: tasks.filter(t => t.status === "PENDING").length },
    { name: "In Progress", value: tasks.filter(t => t.status === "IN_PROGRESS").length },
    { name: "Review", value: tasks.filter(t => t.status === "REVIEW").length },
    { name: "Completed", value: tasks.filter(t => t.status === "COMPLETED").length }
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
