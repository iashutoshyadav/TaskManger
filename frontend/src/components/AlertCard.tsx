export default function AlertCard({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 flex justify-between">
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
