import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
};

export default function PriorityBarChart({ tasks }: Props) {
  const data = [
    { name: "Low", value: tasks.filter(t => t.priority === "LOW").length },
    { name: "Medium", value: tasks.filter(t => t.priority === "MEDIUM").length },
    { name: "High", value: tasks.filter(t => t.priority === "HIGH").length },
    { name: "Urgent", value: tasks.filter(t => t.priority === "URGENT").length }
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
