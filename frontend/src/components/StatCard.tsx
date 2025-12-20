type Props = {
  title: string;
  count: number;
};

export default function StatCard({ title, count }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 w-48">
      <h3 className="font-semibold text-purple-600">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{count} Tasks</p>
    </div>
  );
}
