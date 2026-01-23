import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
};

export default function StatCard({ title, count, icon: Icon, color }: Props) {
  return (
    <div className={`glass-card flex items-center gap-5 min-w-[240px] group hover:-translate-y-1`}>
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{count}</p>
      </div>
    </div>
  );
}
