import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTopbar from "./components/DashboardTopbar";
import { redirect } from "next/navigation";
import { serverApi } from "../lib/serverApi";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const api = await serverApi();
  const { data } = await api.get("/auth/me");

  if (!data.ok) {
    redirect("/auth");
  }

  const user = data.user;

  return (
    <div className="flex h-screen overflow-hidden bg-[--color-bg] text-[--color-text]">
      <DashboardSidebar user={user} />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <DashboardTopbar user={user} />

        {/* Let pages decide their own layout */}
        <main className="flex-1 min-w-0 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
