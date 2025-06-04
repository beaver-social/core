import { cn } from "@/shared/lib/utils";
import { useScreen } from "../hooks/useScreen";
import { useMemo } from "react";

interface TabsProps {
  className?: string;
  tabClassName?: string;
}

interface TabManager {
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  activeTabContent: React.ReactNode;
  hasValidTabs: boolean;
}

function useTabManager(): TabManager {
  const { getTabsForScreen, activeTab, setActiveTab } = useScreen();

  const tabs = useMemo(() => getTabsForScreen(), [getTabsForScreen]);

  const hasValidTabs = tabs && tabs.length > 0;

  const currentActiveTab = useMemo(() => {
    if (!hasValidTabs) return null;

    // Find the active tab, fallback to first tab if active tab doesn't exist
    const foundTab = tabs.find(tab => tab.id === activeTab);
    return foundTab || tabs[0];
  }, [tabs, activeTab, hasValidTabs]);

  const activeTabContent = currentActiveTab?.content || null;

  const handleSetActiveTab = (tabId: string) => {
    if (hasValidTabs && tabs.some(tab => tab.id === tabId)) {
      setActiveTab(tabId);
    }
  };

  return {
    tabs,
    activeTab: currentActiveTab?.id || "default",
    setActiveTab: handleSetActiveTab,
    activeTabContent,
    hasValidTabs
  };
}

function TabHeader({
  tabs,
  activeTabId,
  onTabChange,
  tabClassName
}: {
  tabs: TabManager['tabs'];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  tabClassName?: string;
}) {
  return (
    <div className="sticky glass top-0 z-10 bg-background/50">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex-1 py-4 text-center font-semibold transition-colors",
              activeTabId === tab.id
                ? "text-foreground border-b border-foreground"
                : "text-foreground/50 hover:text-foreground",
              tabClassName,
            )}
            onClick={() => onTabChange(tab.id)}
            aria-selected={activeTabId === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function TabContent({ content }: { content: React.ReactNode }) {
  return (
    <div role="tabpanel">
      {content}
    </div>
  );
}

function Tabs({ className, tabClassName }: TabsProps) {
  const {
    tabs,
    activeTab,
    setActiveTab,
    activeTabContent,
    hasValidTabs
  } = useTabManager();

  if (!hasValidTabs) {
    return (
      <div className={cn("w-full", className)}>
        <div className="text-center py-8 text-foreground/50">
          No tabs available
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} role="tablist">
      <TabHeader
        tabs={tabs}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        tabClassName={tabClassName}
      />
      <TabContent content={activeTabContent} />
    </div>
  );
}

export default Tabs;
