import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
