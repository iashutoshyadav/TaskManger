import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, YAxis, Tooltip } from "recharts";
import { Task } from "@/types/task";

const COLORS = ["#94a3b8", "#3b82f6", "#f97316", "#e11d48"];

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
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
          dy={10}
        />
        <YAxis hide={true} />
        <Tooltip
          cursor={{ fill: 'transparent' }}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
          }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
