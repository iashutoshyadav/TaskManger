import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Task } from "@/types/task";

const COLORS = ["#a855f7", "#22c55e", "#f97316", "#ef4444"];

type Props = {
  tasks: Task[];
};

export default function StatusPieChart({ tasks }: Props) {
  const data = [
    { name: "To Do", value: tasks.filter(t => t.status === "TODO").length },
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
