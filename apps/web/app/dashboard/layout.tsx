import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTopbar from "./components/DashboardTopbar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    throw new Error("API_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/auth/me`, {
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/auth");
  }

  const user = await res.json();

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
