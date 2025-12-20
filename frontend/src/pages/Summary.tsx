import SummaryPanel from "@/components/SummaryPanel";
import { useTasks } from "@/hooks/useTasks";

export default function Summary() {
  const { tasks, isLoading } = useTasks({
    page: 1,
    limit: 100,
    filters: {}
  });

  if (isLoading) {
    return <div className="p-6">Loading summary...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Summary</h1>
        <p className="text-gray-500">
          Overall task analytics and insights
        </p>
      </div>

      {/* ✅ PASS TASKS */}
      <SummaryPanel
        tasks={tasks}
        variant="full"
      />
    </div>
  );
}
