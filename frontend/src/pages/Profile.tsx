import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/auth.api";

export default function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: getMe
  });

  if (isLoading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load profile
      </div>
    );
  }

  const user = data.user;
console.log("USER:", user);

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleString() : "—";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500">
          View your account information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 max-w-lg">
        {/* Avatar + Basic Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>

          <div>
            <p className="text-lg font-semibold">
              {user.name}
            </p>
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Account Type
            </span>
            <span className="font-medium">
              Standard User
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Status
            </span>
            <span className="font-medium text-green-600">
              Active
            </span>
          </div>
        </div>

        {/* Account Activity */}
        <div className="space-y-2 border-t pt-4 mt-4">
          <h3 className="text-sm font-semibold">
            Account Activity
          </h3>

          <p className="text-sm text-gray-500">
            • Joined on{" "}
            <b>{formatDate(user.createdAt)}</b>
          </p>

          <p className="text-sm text-gray-500">
            • Last login{" "}
            <b>{formatDate(user.lastLoginAt)}</b>
          </p>
        </div>
      </div>
    </div>
  );
}
