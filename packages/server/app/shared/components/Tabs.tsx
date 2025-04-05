import { cn } from "@/shared/lib/utils";
import { Tab } from "../types/globalUI";

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  tabClassName?: string;
}

function Tabs({ tabs, activeTab, onTabChange, className, tabClassName }: TabsProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Tabs Header */}
      <div className="sticky glass top-0 z-10 bg-background/50 border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "flex-1 py-4 text-center font-semibold",
                activeTab === tab.id
                  ? "text-primary border-b border-primary"
                  : "text-grey-500 hover:text-grey-700",
                tabClassName
              )}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default Tabs;
