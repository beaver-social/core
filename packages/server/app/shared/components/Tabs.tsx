import { cn } from "@/shared/lib/utils";
import { useGlobalUI } from "../hooks/useGlobalUI";
import { Tab } from "../types/globalUI";
import { useEffect } from "react";

interface TabsProps {
  className?: string;
  tabClassName?: string;
}

function Tabs({ className, tabClassName }: TabsProps) {
  const { getTabs, activeTab, setActiveTab } = useGlobalUI();
  const tabs = getTabs();

  return (
    <div className={cn("w-full", className)}>
      {/* Tabs Header */}
      <div className="sticky glass top-0 z-10 bg-background/50">
        <div className="flex">
          {tabs &&
            tabs.length > 0 &&
            tabs.map((tab) => (
              <button
                key={tab.id}
                className={cn(
                  "flex-1 py-4 text-center font-semibold",
                  activeTab === tab.id
                    ? "text-foreground border-b border-foreground"
                    : "text-foreground/50 hover:text-foreground",
                  tabClassName,
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {tabs &&
          tabs.length > 0 &&
          tabs.find((tab) => tab.id === activeTab)?.content
          ? tabs.find((tab) => tab.id === activeTab)?.content
          : tabs.find((tab) => tab.id === tabs[0].id)?.content}
      </div>
    </div>
  );
}

export default Tabs;
