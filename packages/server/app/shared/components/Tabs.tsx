import { cn } from "@/shared/lib/utils";
import { useGlobalUI } from "../hooks/useGlobalUI";

interface TabsProps {
  className?: string;
  tabClassName?: string;
}

function Tabs({ className, tabClassName }: TabsProps) {
  const { getTabs, activeTab, setActiveTab } = useGlobalUI();
  const tabs = getTabs();

  console.log(activeTab);

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
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content ? tabs.find(tab => tab.id === activeTab)?.content : tabs.find(tab => tab.id === tabs[0].id)?.content}
      </div>
    </div>
  );
}

export default Tabs;
