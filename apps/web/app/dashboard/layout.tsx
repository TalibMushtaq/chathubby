import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTopbar from "./components/DashboardTopbar";
import { redirect } from "next/navigation";
import { serverApi } from "../lib/serverApi";

const api = await serverApi();

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await api.get("/auth/me");

  if (!data.ok) {
    redirect("/auth");
  }

  const user = await data.user;

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <DashboardSidebar user={user} />

      <div className="flex flex-1 flex-col">
        <DashboardTopbar user={user} />

        <main className="p-8 grid grid-cols-3 gap-5">{children}</main>
      </div>
    </div>
  );
}
