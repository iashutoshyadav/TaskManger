type Props = {
  title: string;
  message: string;
};

export default function AlertSummaryCard({ title, message }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p
        className={`text-sm ${
          message.includes("overdue")
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {message}
      </p>
    </div>
  );
}
