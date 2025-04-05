import { cn } from "@/shared/lib/utils";
import { useGlobalUIStore } from "@/shared/stores/zustand";
export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  active?: boolean;
}

interface TabsProps {
  tabData: Tab[];
  className?: string;
  tabClassName?: string;
}

function Tabs({ tabData, className, tabClassName }: TabsProps) {
  const { tabs, setTabs } = useGlobalUIStore()

  return (
    <div className={cn("w-full", className)}>
      {/* Tabs Header */}
      <div className="sticky glass top-0 z-10 bg-background/50 border-b">
        <div className="flex">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "flex-1 py-4 text-center font-semibold",
                tabs.find(t => t.id === tab.id)?.active
                  ? "text-primary border-b border-primary"
                  : "text-grey-500 hover:text-grey-700",
                tabClassName
              )}
              onClick={() => setTabs(
                tabs.map(t => t.id === tab.id ? { ...t, active: true } : { ...t, active: false })
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.find(tab => tab.active)?.content}
      </div>
    </div>
  );
}

export default Tabs;
