// app/dashboard/page.tsx

import StatCard from "./components/StatCard";
import ActivityChart from "./components/ActivityChart";
import ServersCard from "./components/ServersCard";
import ActivityCard from "./components/ActivityCard";
import ActionsCard from "./components/ActionCard";
import MembersCard from "./components/MembersCard";
import { serverApi } from "../lib/serverApi";

interface User {
  displayName?: string;
  username: string;
}

const api = await serverApi();

export default async function DashboardPage() {
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    throw new Error("API_URL not defined");
  }

  const { data } = await api.get("/auth/me");

  if (!data.ok) {
    throw new Error("Failed to fetch user");
  }
  const user = data.user;
  return (
    <>
      <div className="col-span-3 mb-2">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Good evening, {user.displayName ?? user.username} 👋
        </h2>
      </div>

      {/* Stat Cards */}
      <StatCard
        label="Total Members"
        value="48,291"
        delta="12.4%"
        trend="up"
        icon="👥"
      />

      <StatCard
        label="Messages Today"
        value="9,847"
        delta="5.2%"
        trend="up"
        icon="💬"
      />

      <StatCard
        label="Online Now"
        value="3,104"
        delta="2.1%"
        trend="down"
        icon="🟢"
      />
      <ActivityChart />
      <ServersCard />
      <ActivityCard />
      <ActionsCard />
      <MembersCard />
    </>
  );
}
