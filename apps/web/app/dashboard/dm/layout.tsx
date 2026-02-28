import DMSidebar from "../../../components/dmComponent/DMSidebar";

export default function DMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className="w-80 border-r">
        <DMSidebar />
      </div>

      <div className="flex-1 flex">{children}</div>
    </div>
  );
}
