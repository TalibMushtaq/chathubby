import DMSidebar from "../../../components/dmComponent/DMSidebar";

export default function DMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="w-80 shrink-0 border-r border-white/7 overflow-hidden">
        <DMSidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}
