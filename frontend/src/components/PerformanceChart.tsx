import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Task } from "@/types/task";

type Props = {
    tasks: Task[];
};

export default function PerformanceChart({ tasks: _tasks }: Props) {
    const data = [
        { name: "Mon", tasks: 4 },
        { name: "Tue", tasks: 7 },
        { name: "Wed", tasks: 5 },
        { name: "Thu", tasks: 8 },
        { name: "Fri", tasks: 12 },
        { name: "Sat", tasks: 9 },
        { name: "Sun", tasks: 15 },
    ];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        hide={true}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="tasks"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorTasks)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
